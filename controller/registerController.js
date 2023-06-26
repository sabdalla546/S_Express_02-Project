const crypto = require("crypto");
const users = require("../db/usersdb");
const z  = require('zod');

const hashed = (password)=> crypto.createHmac("sha256", password).digest('hex');
const validateData = (req,res,next)=>{
    try {
        const schema = z.object({  
            email: z.string().regex(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)),
            password: z.string().min(8).regex(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d\s:])[\S]*$/)),
            passwordRepeat: z.string().min(8).regex(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d\s:])[\S]*$/))
        });
    
        req.body = schema.parse(req.body);
        if(req.body && req.body.password === req.body.passwordRepeat) {
            next();
        }else{
            res.status(400).json({
                message:"make sure password and password repeat are equal"
            });
        }
       
        } catch (error) {
        res.status(400).json(error.issues);
        }
}
const addUser = (req,res)=>{
    const {email, password} = req.body;
    const hasedPassword = hashed(password);
    users.push({email,password:hasedPassword});
    console.log(users);
    res.json({
        "success": true
    })
}

module.exports = [
    addUser , 
    users,
    validateData
];