const jwt=require('jsonwebtoken');
const authenticate=(req,res,next)=>{
    const authHeader =req.headers['authorization'];
    
    if(authHeader)
    {
        const token=authHeader.split(' ')[1];
        
        if(token)
            {
                jwt.verify(token,process.env.Secret_Key,(err,user)=>{
                    if(err)
                        res.status(403);
                    else
                    {
                        res.user=user;
                        next();
                    }
                })
            }
            else
            {
                res.status(401);
            }
    }
    
}
module.exports=authenticate