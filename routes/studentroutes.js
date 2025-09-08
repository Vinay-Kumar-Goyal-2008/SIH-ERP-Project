const express = require('express');
const router = express.Router();
const model = require('../mongoose-Schema.js');
const axios = require('axios');
const crypto = require('crypto');
const qr_code = require('qrcode');
const PDFDocument = require("pdfkit");
const path=require('path')

// Middleware to check if student is logged in
function islogged(req, res, next) {
    if (req.session.student) {
        return next();
    } else {
        res.sendFile(path.resolve(__dirname, '..', 'notauth.html'));
    }
}

// Store active tokens for attendance QR codes
let activetokens = {};

// Routes

// Student Dashboard
router.get('/dashboard/student', islogged, (req, res) => {
    const path = require('path');
    res.sendFile(path.join(__dirname,'..', 'public', 'static', 'dashboard', 'index.html'));
});

// Login submit check
router.post('/loginsubmitcheck', async (req, res) => {
    let student = await model.findOne({ username: req.body.username, password: req.body.password });
    if (student) {
        req.session.student = student.id;
        req.session.save();
        res.redirect('/dashboard/student');
    } else {
        res.send({ status: 404, desc: 'Cant find' });
    }
});

// Get student data
router.post('/student_data', islogged, async (req, res) => {
    let data = await model.findOne({ id: req.session.student });
    res.json({ status: 200, data: data });
});

// Edit profile data
router.post('/editprofiledata', islogged, async (req, res) => {
    let resp = await model.updateOne(
        { id: req.session.student },
        {
            $set: {
                name: req.body.name,
                gender: req.body.gender,
                email: req.body.email,
                mobile: req.body.mobile
            }
        }
    );
    if (resp) {
        res.json({ status: 200, desc: 'Data Updated Successfully' });
    } else {
        res.json({ status: 404, desc: 'Error occured' });
    }
});

// Graph data
router.get('/graph', islogged, async (req, res) => {
    let graphdata = {};
    let data = await model.findOne({ id: req.session.student });
    data.attendence.forEach(e => {
        graphdata[e.subject] = e.percentage;
    });
    let resp = await axios.post('http://localhost:5001/gengraph', graphdata);
    res.json({ graph: resp.data.graph });
});

// Download fee receipt as PDF
router.post('/downloadreceipt', islogged, async (req, res) => {
    let studdata = await model.findOne({ id: req.session.student });
    studdata.fees.payment_history.forEach(e => {
        if (e.transaction_id == req.body.txnid) {
            const doc = new PDFDocument();
            res.setHeader("Content-Disposition", `inline; filename=receipt-${req.body.txnid}.pdf`);
            res.setHeader("Content-Type", "application/pdf");
            doc.pipe(res);
            doc.fontSize(18).font("Helvetica-Bold").text("Delhi Technological University", { align: "center" });
            doc.moveDown();
            doc.fontSize(14).font("Helvetica-Bold").text("Fee Payment Receipt", { align: "center" });
            doc.moveDown(2);
            doc.fontSize(12);

            doc.font("Helvetica-Bold").text("Transaction ID: ", { continued: true }).font("Helvetica").text(`${req.body.txnid}`).moveDown(0.8);
            doc.font("Helvetica-Bold").text("Student Name: ", { continued: true }).font("Helvetica").text(`${req.body.studentname}`).moveDown(0.8);
            doc.font("Helvetica-Bold").text("Student ID: ", { continued: true }).font("Helvetica").text(`${req.body.studentid}`).moveDown(0.8);
            doc.font("Helvetica-Bold").text("Amount Paid: ", { continued: true }).font("Helvetica").text(`${req.body.amount}`).moveDown(0.8);
            doc.font("Helvetica-Bold").text("Transaction Status: ", { continued: true }).font("Helvetica").text(`${req.body.txnstatus}`).moveDown(0.8);
            doc.font("Helvetica-Bold").text("Semester: ", { continued: true }).font("Helvetica").text(`${req.body.semester}`).moveDown(2);
            doc.font("Helvetica-Oblique").text("This is a computer generated receipt.", { align: "center" });
            doc.end();
        }
    });
});

// Pay fees
router.post('/payfees', islogged, async (req, res) => {
    let updres = await model.updateOne({ id: req.session.student }, {
        $set: {
            'fees.amount_due': 0,
            'fees.current_fee_status': 'Paid'
        },
        $push: {
            'fees.payment_history': {
                semester: req.body.semester,
                transaction_status: 'Success',
                transaction_id: req.body.previd + 1,
                amount: req.body.amount
            }
        }
    });
    if (updres.acknowledged) {
        res.json({ status: 200 });
    } else {
        res.json({ status: 404 });
    }
});

// Logout
router.post('/logout', islogged, (req, res) => {
    req.session.destroy();
    res.json({ status: 200 });
});

// Generate student QR code
router.post('/studentqrcode', islogged, async (req, res) => {
    let data = await model.findOne({ id: req.body.id }, {
        _id: 0,
        id: 1,
        name: 1,
        branch: 1,
        section: 1,
        mobile: 1,
        email: 1
    });
    let qr = await qr_code.toDataURL(JSON.stringify(data));
    res.json({ qr: qr });
});

// Generate attendance QR code
router.post('/attendanceqrcode', islogged, async (req, res) => {
    let token = crypto.randomBytes(8).toString('hex');
    let expiry = Date.now() + 10000;
    activetokens[token] = { studid: req.session.student, expiry: expiry };
    let data = {
        url: `http://localhost:3000/updateattendance?studid=${req.body.id}&ts=${Date.now()}&token=${token}`,
        token: token
    };
    let qr = await qr_code.toDataURL(data.url);
    res.json({ url: qr });
});

// Update attendance
router.post('/updateattendance', async (req, res) => {
    let id = req.query.studid;
    let token = req.query.token;
    if (token in activetokens) {
        await model.updateOne({ id: id }, {
            $inc: { 'attendence.0.lectures_conducted': 1, 'attendence.0.lectures_attended': 1 }
        });
        const student = await model.findOne({ id });
        const lecturesConducted = student.attendence[0].lectures_conducted;
        const lecturesAttended = student.attendence[0].lectures_attended;
        const percentage = (lecturesAttended / lecturesConducted) * 100;
        await model.updateOne({ id }, { $set: { 'attendence.0.percentage': percentage } });
        res.json({ status: 200 });
    } else {
        res.json({ status: 404 });
    }
});

// Chatbot interaction
router.post('/askchatbot', islogged, async (req, res) => {
    let prompt = req.body.prompt;
    let studdata = await model.findOne({ id: req.session.student });
    let data = { student: studdata, prompt: prompt };
    let ans = await axios.post('http://localhost:5001/askchat', data);
    res.json({ ans: ans.data.ans });
});

// Cleanup expired tokens
setInterval(() => {
    const now = Date.now();
    for (let t in activetokens) {
        if (activetokens[t].expiry < now) {
            delete activetokens[t];
        }
    }
}, 10000);

module.exports = router;