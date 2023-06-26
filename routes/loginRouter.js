const express = require("express");

const [userLogin,validateData] = require("../controller/loginController");
const loginRouter = express.Router();

loginRouter.post('/', validateData,userLogin)
module.exports = loginRouter;