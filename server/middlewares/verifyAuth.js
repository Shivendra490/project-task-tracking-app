const jwt=require("jsonwebtoken")
exports.verifyAuth=async(req,res,next)=>{
    try{
        const token=req.headers.authorization
        console.log('headers',req.headers)
        if(!token?.trim()){
            res.status(402).json({message:"Unauthorized Access"})
            return 
        }
        const decodedToken=jwt.verify(token,process.env.SECRET_KEY)
       
        req.userId=decodedToken.userId
        next()

    }catch(err){
        console.log('backerr',err)
        res.status(402).json({message:"Unauthorized err Access"})
    }
}

