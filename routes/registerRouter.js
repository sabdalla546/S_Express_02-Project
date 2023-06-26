const express = require("express");

const [addUser , _ ,validateData] = require("../controller/registerController");

const registerRouter=express.Router();

registerRouter.post('/',validateData,addUser)

module.exports = registerRouter;