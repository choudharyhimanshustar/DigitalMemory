const express = require('express');
const Memory = require('./models/Memories');
const router = express.Router();
const {uploadMedia}=require('./Services/Cloudinary')

router.post('/',async (req, res) => {
    try {
        const {userId,title,category,emotions } = req.body;
        console.log(userId);
        
        const multimedia=req.files?req.files.multimedia:null;
        let multimediaUrl=null;
       
        if(multimedia!=null)
        {
            multimediaUrl=await uploadMedia(multimedia.tempFilePath) 
        }
        console.log(multimediaUrl)
        
        const newUser = new Memory({
            userId,
            title,
            multimedia:multimediaUrl,
            category,
            emotions,
        })
        await newUser.save();
       
        res.json({message:"Memory Saved Successfully",memory:newUser})
    } catch (error) {
        res.json(error);
    }

})
module.exports=router;