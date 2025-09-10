const mongoose=require('mongoose')

let hostelschema=new mongoose.Schema({
    hostels: [String]
})

module.exports=new mongoose.model('hostelschema',hostelschema)