const jwt = require("jsonwebtoken");
const veryifyUser= (req,res,next)=>{
    try{
        const [_,token] =req.headers.authorization?.split(' ');
    console.log(token);
    const decode = jwt.verify(token,'alsaeed17108646');
    console.log(decode);
    req.user= decode;
    next();
    }catch(err){
        return res.status(401).json({
            status:"error",
            message:"unauthenticated"
        });
    }
}

module.exports = veryifyUser;