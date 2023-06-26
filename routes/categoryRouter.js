const express = require('express');
const veryifyUser = require('../controller/verifyUser');
const [
    checkId,
    getAllCategory,
    getSingleCategory,
    validateData,
    addItem,
    updateItem,
    deleteItem] = require('../controller/categoryController');
const categoryRouter= express.Router();
categoryRouter.param('id',checkId)

categoryRouter
.get('/',getAllCategory)
.post('/',veryifyUser,validateData,addItem);

categoryRouter
.get('/:id([0-9]+)',getSingleCategory)
.put('/:id([0-9]+)',veryifyUser,validateData,updateItem)
.delete('/:id([0-9]+)',veryifyUser,deleteItem);
module.exports=categoryRouter;
//Category