const express = require('express');
const veryifyUser = require("../controller/verifyUser");
const [
    getAllProdect,
    getSingleProduct,
    checkId,
    validateData,
    addItem,
    deleteItem,
    updateItem] = require('../controller/productController');

const productRouter= express.Router();

productRouter.param('id',checkId)

productRouter
.get('/',getAllProdect)
.post('/',veryifyUser,validateData,addItem);

productRouter
.get('/:id([0-9]+)',getSingleProduct)
.put('/:id([0-9]+)',veryifyUser,validateData,updateItem)
.delete('/:id([0-9]+)',veryifyUser,deleteItem);

module.exports=productRouter;



