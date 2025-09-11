const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const path = require('path');

const studentRoutes = require('./routes/studentroutes'); // Student routes
const admin = require('./routes/adminroutes'); // If you create an admin routes file later
const announcements=require('./announcements-schema.js')
mongoose.connect('mongodb://localhost:27017/schooldata');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public')); // Static files middleware
app.use(cors());

app.use(session({
    secret: "Vinay Kumar Goyal",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 20 },
    rolling: true
}));

// Use the student routes
app.use('/', studentRoutes);

// Other GET routes for pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main', 'index.html'));
});

app.get('/student_login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'student_login', 'index.html'));
});

app.get('/admin_login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin_login', 'index.html'));
});

app.get('/announcement_data',async (req,res)=>{
    let data=await announcements.find({})
    console.log(data)
    res.json({status:200,data:data})
})
// Admin routes or other logic can go here
// Example:
app.use('/admin', admin);

console.log(process.memoryUsage());

app.listen(9000, () => {
    console.log('Server is running on port 9000');
});
