const Memories=require('./models/Memories');
const express=require('express');
const router=express.Router();
router.delete('/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        console.log(id);
       
        const memory=await Memories.findByIdAndDelete(id);
        
        if(!memory)
            return res.json({message:"Memory not found"});
        return res.json({message:"Memory deleted"})
    } catch (error) {
        return res.json({message:"Delete Error",error})
    }
})
module.exports=router