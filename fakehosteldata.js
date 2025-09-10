const mongoose = require('mongoose');
const HostelSchema = require('./mongoose-hosteldata-schema.js'); // adjust path

mongoose.connect('mongodb://localhost:27017/schooldata', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');

        const hostels = ['A', 'B', 'C', 'D', 'E'];
        const totalRooms = 500;

        const hostelArray = [];

        hostels.forEach(h => {
            for (let i = 1; i <= totalRooms; i++) {
                const roomNumber = i.toString(); // Room-001
                hostelArray.push(`Hostel-${h}_Room-${roomNumber}`);
            }
        });

        const hostelDoc = new HostelSchema({
            hostels: hostelArray
        });

        await hostelDoc.save();
        console.log('Hostels document saved with', hostelArray.length, 'entries!');
        mongoose.connection.close();
    })
    .catch(err => console.log(err));
