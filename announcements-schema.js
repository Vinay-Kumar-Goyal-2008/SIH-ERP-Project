const mongoose=require('mongoose')
let announcementschema=new mongoose.Schema({
    announcement:{
        desc:String,
        date:Date
    }
})

module.exports=new mongoose.model('announcements',announcementschema)