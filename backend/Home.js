const authenticate = require("./Authenticate");  // Import correctly

const express=require('express');
const router=express.Router();
router.get('',authenticate,(req,res)=>{
    
    res.json({message:"Welcome to Home Page"});
})
module.exports=router;