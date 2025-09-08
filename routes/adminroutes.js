const express = require('express');
const path = require('path');
const adminschema = require('../mongoose-Schema-admin.js');
const mongoose=require('mongoose')
const model=require('../mongoose-Schema.js')
const router = express.Router();
mongoose.connect('mongodb://localhost:27017/schooldata')
// Middleware to check if admin is logged in
function isadminlogged(req, res, next) {
    if (req.session.admin) {
        return next();
    } else {
        res.sendFile(path.join(__dirname, '..', 'notauth.html'));
    }
}

// Admin login submit check
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

module.exports = router;
