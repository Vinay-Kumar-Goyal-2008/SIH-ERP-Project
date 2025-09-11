const express = require('express');
const path = require('path');
const adminschema = require('../mongoose-Schema-admin.js');
const mongoose = require('mongoose')
const model = require('../mongoose-Schema.js')
const admissions = require('../mongoose-admission-Schema.js')
const hostels = require('../mongoose-hosteldata-schema.js')
const announcements=require('../announcements-schema.js')
const router = express.Router();
const nodemailer = require('nodemailer');

async function sendEmail(to, subject, message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sdafasd@gmail.com',
            pass: 'your-app-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: to,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);
        else console.log('Email sent: ' + info.response);
    });
}
mongoose.connect('mongodb://localhost:27017/schooldata')
function isadminlogged(req, res, next) {
    if (req.session.admin) {
        return next();
    } else {
        res.sendFile(path.join(__dirname, '..', 'notauth.html'));
    }
}
router.post('/adminloginsubmitcheck', async (req, res) => {
    let admindata = await adminschema.findOne({ username: req.body.username, password: req.body.password });
    if (admindata) {
        req.session.admin = admindata.admin_id;
        res.redirect('/admin/admin_dashboard');
    } else {
        res.json({ status: 404 });
    }
});

// Admin dashboard
router.get('/admin_dashboard', isadminlogged, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'static', 'admin_dashboard', 'index.html'));
});

router.post('/totalstudents', isadminlogged, async (req, res) => {
    let count = await model.countDocuments({})
    const result = await model.aggregate([
        {
            $group: {
                _id: null,
                totalDue: { $sum: "$fees.amount_due" },
                totalPaid: { $sum: { $sum: "$fees.payment_history.amount" } }
            }
        }
    ]);
    amountdue = result[0].totalDue
    amountpaid = result[0].totalPaid

    res.json({ status: 200, num: count, amountpaid: amountpaid, amountdue: amountdue })
})

router.post('/admissionsdata', isadminlogged, async (req, res) => {
    let num = await admissions.countDocuments()
    let approved = await admissions.countDocuments({ admission_status: 'approved' })
    let rejected = await admissions.countDocuments({ admission_status: 'rejected' })
    let pending = await admissions.countDocuments({ admission_status: 'pending' })
    let allstudentsdata = await admissions.find({}, { student_id: 1, name: 1, admission_status: 1, applied_on: 1 })
    console.log("Data size:", JSON.stringify(allstudentsdata).length / 1024, "KB");
    res.json({ num: num, approved: approved, pending: pending, rejected: rejected, status: 200, alldata: allstudentsdata })
})

router.post('/studdata', isadminlogged, async (req, res) => {
    const data = req.body;
    const excludeValue = 'null';
    Object.keys(data).forEach(key => {
        if (data[key] == excludeValue) delete data[key];
    });
    let founddata = await model.find(data)
    res.json({ status: 200, founddata: founddata })
})

router.post('/addadmdata', isadminlogged, async (req, res) => {
    let tempid = req.body.tempid
    let studdata = await admissions.findOne({ student_id: tempid })
    if (studdata) {
        const arr = ['CSE', 'ECE', 'CE', 'ME'];
        let sec = ['A', 'B', 'C']
        const randomElement = arr[Math.floor(Math.random() * arr.length)];
        const randomsec = sec[Math.floor(Math.random() * sec.length)];
        let hostarr = (await hostels.findOne()).hostels
        const randomhost = hostarr[Math.floor(Math.random() * hostarr.length)].split('_')
        let randomnum=Math.floor(Math.random()*1000)
        let adddata = await model.insertOne({
            username:studdata.name.slice(0,4)+randomnum.toString(),
            password:studdata.name.slice(0,4)+studdata.email.slice(3,6)+studdata.branch.slice(1,),
            name: studdata.name,
            email: studdata.email,
            mobile: studdata.mobile,
            gender: studdata.gender,
            branch: randomElement,
            section: randomsec,
            semester: 1,
            id: (await model.countDocuments()) + 1,
            hostel: {
                allocated_hostel: randomhost[0],
                allocated_room: randomhost[1]
            }

        })
        if (adddata) {
            await admissions.deleteOne({ student_id: tempid })
            // try{
            //     sendEmail(studdata.email,'Admission in college',`Congratulations you have been admitted to the college and have been alloted hostel your hostel is ${randomhost[0]}, ${randomhost[1]}. Thank YOu`)
            // }catch{
            //     pass
            // }
            res.json({ status: 200, hostel: randomhost })
        } else {
            res.json({ status: 404 })
        }
    }
})

router.post('/deladmdata', isadminlogged, async (req, res) => {
    let tempid = req.body.tempid
    await admissions.deleteOne({ student_id: tempid })
    res.json({ status: 200 })
})

router.post('/allhostelsdata', isadminlogged, async (req, res) => {
    res.json()
})

router.post('/hosteldataofstud', isadminlogged, async (req, res) => {
    let id = req.body.id
    let studdata = await model.findOne({ id: id })
    res.json({ status: 200, data: studdata.hostel, name: studdata.name, id: id })
})

router.post('/edithosteldata', isadminlogged, async (req, res) => {
    let id = req.body.id
    let room = req.body.room
    let hostel = req.body.hostel
    let resp = await model.updateOne({ id: id }, { $set: { 'hostel.allocated_hostel': hostel, 'hostel.allocated_room': room } })
    if (resp) {
        res.json({ status: 200 })
    } else {
        res.json({ status: 404 })
    }
})

router.post('/libdataofstudent', isadminlogged, async (req, res) => {
    let id = req.body.studid
    let studlibdata = await model.findOne({ id: id })
    if (studlibdata) {
        res.json({ status: 200, id: id, name: studlibdata.name, borrowed_books: studlibdata.library.borrowed_books, due_data: studlibdata.library.due_date })
    } else {
        res.json({ status: 404 })
    }
})

router.post('/issue-book', isadminlogged, async (req, res) => {
    const today = new Date();
    console.log(today)
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    console.log(nextWeek)
    let id = parseInt(req.body.id)
    let book = req.body.bookname
    let resp = await model.updateOne({ id: id }, { $push: { 'library.borrowed_books': book, 'library.due_date':nextWeek} })
    console.log(resp)
    if (resp){
        res.json({status:200})
    }else{
        res.json({status:404})
    }
})

router.post('/returnbook',isadminlogged,async (req,res)=>{
    let id=parseInt(req.body.id)
    let studdata=await model.findOne({id:id})
    let book=req.body.bookname
    let due_date=studdata.library.due_date[studdata.library.borrowed_books.indexOf(book)]
    let resp=await model.updateOne({id:id},{$pull:{'library.borrowed_books':book,'library.due_date':due_date}})
    if (resp.acknowledged==true){
        res.json({status:200})
    }else{
        res.json({status:404})
    }
})

router.post('/announcementpost',isadminlogged,async (req,res)=>{
    let date=new Date()
    let announcementdata=req.body.announcement
    let resp= await announcements.insertOne({ announcement: { desc: announcementdata, date: date } })
    if (resp){
        res.json({status:200})
    }else{
        res.json({status:404})
    }
})

router.post('/logout',isadminlogged,async (req,res)=>{
    req.session.destroy()
    res.json({status:200})
})
module.exports = router;
