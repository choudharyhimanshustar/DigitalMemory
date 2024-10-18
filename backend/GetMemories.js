const express=require('express');
const Memory=require('./models/Memories');
const router=express.Router();
router.get('/',async(req,res)=>{
    try {
        const userId=req.query.id;
      
        const response=await Memory.find({userId});
       
        res.json({response});
    } catch (error) {
        res.json(error);
    }
})
module.exports=router;