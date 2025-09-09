const mongoose = require('mongoose');
const Chance = require('chance');
const chance = new Chance();
const Student = require('./mongoose-Schema'); // your updated schema file

mongoose.connect('mongodb://localhost:27017/schooldata', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const branches = ['CSE', 'ECE', 'ME', 'CE'];
const sections = ['A', 'B', 'C'];
const subjects = ['Math', 'Physics', 'Chemistry', 'CS', 'English'];
const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

// Generate attendance object
function randomAttendance() {
    const lectures_conducted = chance.integer({ min: 20, max: 50 });
    const lectures_attended = chance.integer({ min: 0, max: lectures_conducted });
    const percentage = ((lectures_attended / lectures_conducted) * 100).toFixed(2);

    return {
        subject: chance.pickone(subjects),
        lectures_conducted,
        lectures_attended,
        total_lectures: lectures_conducted,
        percentage
    };
}

// Generate fees object
function randomFees() {
    const semesters = chance.integer({ min: 1, max: 8 });
    const payment_history = Array.from({ length: semesters }, (_, i) => ({
        semester: i + 1,
        transaction_status: chance.pickone(['Paid', 'Pending']),
        transaction_id: chance.integer({ min: 100000, max: 999999 }),
        amount: chance.integer({ min: 10000, max: 150000 })
    }));

    return {
        semester: semesters,
        current_fee_status: chance.pickone(['Paid', 'Pending']),
        amount_due: chance.integer({ min: 0, max: 50000 }),
        payment_history
    };
}

// Generate marks object
function randomMarks() {
    const semesters = chance.integer({ min: 1, max: 8 });
    return Array.from({ length: semesters }, (_, i) => ({
        semester: i + 1,
        sem_marks_total: subjects.map(sub => ({
            subject: sub,
            sub_marks: chance.integer({ min: 40, max: 100 })
        }))
    }));
}

// Generate timetable object
function randomTimetable() {
    return days.map(day => ({
        day,
        slot1: chance.pickone(subjects),
        slot2: chance.pickone(subjects),
        slot3: chance.pickone(subjects),
        slot4: chance.pickone(subjects),
        slot5: chance.pickone(subjects),
        slot6: chance.pickone(subjects),
        slot7: chance.pickone(subjects),
        slot8: chance.pickone(subjects),
        slot9: chance.pickone(subjects)
    }));
}

// Main generation function
async function generateStudents(num = 10000) {
    try {
        // Delete old data
        await Student.deleteMany({});
        console.log('Previous student data deleted');

        const batchSize = 1000; // insert in batches
        for (let batchStart = 1; batchStart <= num; batchStart += batchSize) {
            const batch = [];

            for (let i = batchStart; i < batchStart + batchSize && i <= num; i++) {
                batch.push({
                    id: i,
                    username: `user${i}_${chance.string({ length: 5, pool: 'abcdefghijklmnopqrstuvwxyz0123456789' })}`,
                    password: `pass${i}_${chance.string({ length: 6 })}`,
                    name: chance.name(),
                    branch: chance.pickone(branches),
                    section: chance.pickone(sections),
                    semester: chance.integer({ min: 1, max: 8 }),
                    gender: chance.pickone(['Male', 'Female', 'Other']),
                    email: `user${i}@example.com`, // unique email
                    mobile: 6000000000 + i, // unique mobile
                    attendence: Array.from({ length: subjects.length }, randomAttendance),
                    fees: randomFees(),
                    library: {
                        borrowed_books: Array.from({ length: chance.integer({ min: 0, max: 5 }) }, () => chance.word()),
                        due_date: Array.from({ length: chance.integer({ min: 0, max: 5 }) }, () => chance.date({ year: 2024 }))
                    },
                    hostel: {
                        allocated_room: `Room-${chance.integer({ min: 1, max: 500 })}`,
                        allocated_hostel: `Hostel-${chance.pickone(['A', 'B', 'C', 'D'])}`
                    },
                    timetable: randomTimetable(),
                    marks: randomMarks()
                });
            }

            await Student.insertMany(batch);
            console.log(`Inserted ${batchStart + batch.length - 1} students`);
        }

        console.log(`${num} fake students inserted successfully!`);
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
}

// Run the generator
generateStudents(30000);
