const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
const PDFDocument = require("pdfkit");
const model = require('./mongoose-Schema.js')
const adminschema = require('./mongoose-Schema-admin.js')
const axios = require('axios')
const crypto = require('crypto')
const qr_code = require('qrcode')
mongoose.connect('mongodb://localhost:27017/schooldata')
let path = require('path')
let app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.use(cors())
app.use(
    session({
        secret: "Vinay Kumar Goyal",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 1000 * 60 * 20 },
        rolling: true
    })
)
let activetokens = {}
function islogged(req, res, next) {
    if (req.session.student) {
        return next()
    } else {
        res.sendFile(__dirname + '/notauth.html')
    }
}
function isadminlogged(req, res, next) {
    if (req.session.admin) {
        return next()
    } else {
        res.sendFile(__dirname + '/notauth.html')
    }
}
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/main/index.html')
})

app.get('/student_login', (req, res) => {
    res.sendFile(__dirname + '/public/student_login/index.html')
})
app.get('/dashboard/student', islogged, (req, res) => {
    console.log("Dashboard route hit. Session:", req.session);
    res.sendFile(path.join(__dirname, 'public', 'static', 'dashboard', 'index.html'))
})
app.post('/loginsubmitcheck', async (req, res) => {
    let student = await model.findOne({ username: req.body.username, password: req.body.password })
    if (student) {
        req.session.student = student.id
        req.session.save()
        res.redirect('/dashboard/student');

    } else {
        res.send({ status: 404, desc: 'Cant find' })
    }
}
)
app.post('/student_data', islogged, async (req, res) => {
    res.json(await model.findOne({ id: req.session.student }))
})
app.post('/editprofiledata', islogged, async (req, res) => {

    let resp = await model.updateOne({ id: req.session.student },
        {
            $set: {
                name: req.body.name,
                gender: req.body.gender,
                email: req.body.email,
                mobile: req.body.mobile
            }
        }
    )
    if (resp) {
        res.json({ status: 200, desc: 'Data Updated Successfully' })

    } else {
        res.json({ status: 404, desc: 'Error occured' })
    }
})

app.get('/graph', islogged, async (req, res) => {
    let graphdata = {}
    data = await model.findOne({ id: req.session.student })
    data.attendence.forEach(e => {
        graphdata[e.subject] = e.percentage
    });
    let resp = await axios.post('http://localhost:5001/gengraph', graphdata)
    res.json({ graph: resp.data.graph })
})

app.post('/downloadreceipt', islogged, async (req, res) => {
    studdata = await model.findOne({ id: req.session.student })
    studdata.fees.payment_history.forEach(e => {
        if (e.transaction_id == req.body.txnid) {
            let txnid = req.body.txnid
            let txnstatus = req.body.txnstatus
            let amount = req.body.amount
            let studentid = req.body.studentid
            let studentname = req.body.studentname
            let semester = req.body.semester
            const doc = new PDFDocument()
            res.setHeader("Content-Disposition", `inline; filename=receipt-${txnid}.pdf`)
            res.setHeader("Content-Type", "application/pdf")
            doc.pipe(res)
            doc.fontSize(18).font("Helvetica-Bold").text("Delhi Technological University", { align: "center" })
            doc.moveDown()
            doc.fontSize(14).font("Helvetica-Bold").text("Fee Payment Receipt", { align: "center" })
            doc.moveDown(2)
            doc.fontSize(12)

            doc.font("Helvetica-Bold").text("Transaction ID: ", { continued: true })
            doc.font("Helvetica").text(`${txnid}`)
            doc.moveDown(0.8)

            doc.font("Helvetica-Bold").text("Student Name: ", { continued: true })
            doc.font("Helvetica").text(`${studentname}`)
            doc.moveDown(0.8)

            doc.font("Helvetica-Bold").text("Student ID: ", { continued: true })
            doc.font("Helvetica").text(`${studentid}`)
            doc.moveDown(0.8)

            doc.font("Helvetica-Bold").text("Amount Paid: ", { continued: true })
            doc.font("Helvetica").text(`${amount}`)
            doc.moveDown(0.8)

            doc.font("Helvetica-Bold").text("Transaction Status: ", { continued: true })
            doc.font("Helvetica").text(`${txnstatus}`)
            doc.moveDown(0.8)

            doc.font("Helvetica-Bold").text("Semester: ", { continued: true })
            doc.font("Helvetica").text(`${semester}`)
            doc.moveDown(2)

            doc.font("Helvetica-Oblique").text("This is a computer generated receipt.", { align: "center" })

            doc.end()
        }
    })
})
app.post('/payfees', islogged, async (req, res) => {
    let updres = await model.updateOne({ id: req.session.student }, {
        $set: {
            'fees.amount_due': 0,
            'fees.current_fee_status': 'Paid',
        },
        $push: {
            'fees.payment_history': {
                semester: req.body.semester,
                transaction_status: 'Success',
                transaction_id: req.body.previd + 1,
                amount: req.body.amount
            }
        }
    })
    if (updres.acknowledged = true) {
        res.json({ status: 200 })
    } else {
        res.json({ status: 404 })
    }
})
app.post('/logout', islogged, (req, res) => {
    req.session.destroy()
    res.json({ status: 200 })
})

app.get('/admin_login', (req, res) => {
    res.sendFile(__dirname + '/public/admin_login/index.html')
})

app.post('/adminloginsubmitcheck', async (req, res) => {
    let admindata = await adminschema.findOne({ username: req.body.username, password: req.body.password })
    if (admindata) {
        req.session.admin = admindata.admin_id
        res.redirect('/admin_dashboard')
    } else {
        res.json({ status: 404 })
    }
})
app.get('/admin_dashboard',isadminlogged,(req,res)=>{
    res.sendFile(__dirname+'/public/static/admin_dashboard/index.html')
})

app.post('/studentqrcode', islogged, async (req, res) => {
    let data = await model.findOne({ id: req.body.id }, {
        _id: 0,
        id: 1,
        name: 1,
        branch: 1,
        section: 1,
        mobile: 1,
        email: 1
    })
    qr = await qr_code.toDataURL(JSON.stringify(data))
    res.json({ qr: qr })

})

app.post('/attendanceqrcode', islogged, async (req, res) => {
    let token = crypto.randomBytes(8).toString('hex')
    let expiry = Date.now() + 10000
    activetokens[token] = { studid: req.session.student, expiry: expiry }
    data = { url: `http://localhost:3000/updateattendance?studid=${req.body.id}&ts=${Date.now()}&token=${token}` }
    data.token = token
    qr = await qr_code.toDataURL(data.url)
    res.json({ url: qr })
})
setInterval(() => {
    const now = Date.now();
    for (let t in activetokens) {
        if (activetokens[t].expiry < now) {
            delete activetokens[t];
        }
    }
}, 10000)

app.post('/updateattendance', async (req, res) => {
    let id = req.query.studid
    let token=req.query.token
    if (token in activetokens){
let data = await model.updateOne({ id: id },
        { $inc: { 'attendence.0.lectures_conducted': 1, 'attendence.0.lectures_attended': 1 } }
    )
    const student = await model.findOne({ id });

    const lecturesConducted = student.attendence[0].lectures_conducted;
    const lecturesAttended = student.attendence[0].lectures_attended;

    const percentage = (lecturesAttended / lecturesConducted) * 100

    await model.updateOne(
        { id },
        { $set: { 'attendence.0.percentage': percentage } }
    );

    res.json({status:200})
    }else{
        res.json({status:404})
    }
    
})

app.post('/askchatbot',islogged,async (req,res)=>{
    let prompt= req.body.prompt
    studdata=await model.findOne({id:req.session.student})
    data={student:studdata,prompt:prompt}
    let ans=await axios.post('http://localhost:5001/askchat',data)
    res.json({ans:ans.data.ans})
})

console.log(process.memoryUsage())

app.listen(9000)
