const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    student_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    admission_status: { 
        type: String, 
        enum: ['pending-review', 'approved', 'rejected'], 
        default: 'pending-review' 
    },
    applied_on: { type: Date, default: Date.now },
    remarks: { type: String } // optional notes or admin comments
});

module.exports = mongoose.model('AdmissionForm', admissionSchema);