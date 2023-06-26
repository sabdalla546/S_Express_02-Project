const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const z  = require('zod');
const [_,users] = require("../controller/registerController");

const hashed = (password)=> crypto.createHmac("sha256", password).digest('hex');

const validateData = (req,res,next)=>{
    try {
        const schema = z.object({  
            email: z.string().regex(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)),
            password: z.string().min(8).regex(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d\s:])[\S]*$/)),
            
        });
        req.body = schema.parse(req.body);
        next();
        } catch (error) {
        res.status(400).json(error.issues);
        }
}
const userLogin = (req,res)=>{
    console.log(users);
    const {email , password} = req.body;
    const user = users.find(user=> user.email=== email);
    console.log(user);
    if(!user || user.password !== hashed(password)) {
        return res.status(401).json({
            status:"error",
            message:"unauthenticated"
        });
    }
    const token = jwt.sign(user, 'alsaeed17108646');
    return res.status(200).json({
        ...user,
        token
    });
}

module.exports = 
[
    userLogin,
    validateData
];