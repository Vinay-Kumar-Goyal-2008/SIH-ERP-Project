const mongoose = require('mongoose');
const Chance = require('chance');
const chance = new Chance();
const AdmissionForm = require('./mongoose-admission-Schema'); // path to your schema

mongoose.connect('mongodb://localhost:27017/schooldata', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

async function generateAdmissions(num = 50000) {
    try {
        // Optional: delete old data
        await AdmissionForm.deleteMany({});
        console.log('Previous admission forms deleted');

        const batchSize = 1000; // insert in batches
        for (let batchStart = 1; batchStart <= num; batchStart += batchSize) {
            const batch = [];

            for (let i = batchStart; i < batchStart + batchSize && i <= num; i++) {
                batch.push({
                    student_id: i,
                    name: chance.name(),
                    email: `user${i}@example.com`, // unique email
                    mobile: 6000000000 + i,       // unique mobile number
                    gender: chance.pickone(['Male', 'Female', 'Other']),
                    admission_status: 'pending',
                    remarks: chance.sentence({ words: 5 }) // optional notes
                    // branch, section, semester left undefined for admin assignment
                });
            }

            await AdmissionForm.insertMany(batch);
            console.log(`Inserted ${batchStart + batch.length - 1} admission forms`);
        }

        console.log(`${num} fake admission forms inserted successfully!`);
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
}

// Run the generator
generateAdmissions(50000);
