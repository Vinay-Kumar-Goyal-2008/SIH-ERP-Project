const express = require('express');
const path = require('path');
const adminschema = require('../mongoose-Schema-admin.js');
const mongoose=require('mongoose')
const model=require('../mongoose-Schema.js')
const admissions=require('../mongoose-admission-Schema.js')
const router = express.Router();
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

router.post('/totalstudents',isadminlogged,async (req,res)=>{
    let count=await model.countDocuments({})
    const result = await model.aggregate([
            {
                $group: {
                    _id: null,
                    totalDue: { $sum: "$fees.amount_due" },
                    totalPaid: { $sum: { $sum: "$fees.payment_history.amount" } }
                }
            }
        ]);
        amountdue= result[0].totalDue
        amountpaid= result[0].totalPaid

    res.json({status:200,num:count,amountpaid:amountpaid,amountdue:amountdue})
})

router.post('/admissionsdata',isadminlogged,async (req,res)=>{
    let num= await admissions.countDocuments()
    let approved= await admissions.countDocuments({admission_status:'approved'})
    let rejected= await admissions.countDocuments({admission_status:'rejected'})
    let pending= await admissions.countDocuments({admission_status:'pending'})
    let allstudentsdata=await admissions.find({},{student_id:1,name:1,admission_status:1,applied_on:1})
    console.log("Data size:", JSON.stringify(allstudentsdata).length / 1024, "KB");
    res.json({num:num,approved:approved,pending:pending,rejected:rejected,status:200,alldata:allstudentsdata})
})

router.post('/studdata',isadminlogged,async (req,res)=>{
    const data = req.body;
    const excludeValue = 'null';
    Object.keys(data).forEach(key => {
        if (data[key]==excludeValue) delete data[key];
    });
    let founddata=await model.find(data)
    res.json({status:200,founddata:founddata})
})
module.exports = router;
