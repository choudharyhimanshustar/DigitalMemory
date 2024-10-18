const mongoose=require('mongoose');

const MemorySchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
   
    multimedia:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:['Family','Travel','Achievements','Milestones','Others'],
        required:true
    },
    emotions:{
        type:String,
        enum:['happy', 'sad', 'proud', 'nostalgic'],
        required:true
    },
    favorite:
    {
        type:Boolean,
        default:false
    },
    location:{
        type:String
    }
})

module.exports=mongoose.model("Memory",MemorySchema)