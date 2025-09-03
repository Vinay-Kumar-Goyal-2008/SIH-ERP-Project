const mongoose=require('mongoose')

let adminschema=new mongoose.Schema({
    name:String,
    age:Number,
    admin_id:Number,
    gender:String,
    role:String,
    digi_id:String,
    email:String,
    mobile:Number,
    username:String,
    password:String
})

module.exports=new mongoose.model('adminschema',adminschema)