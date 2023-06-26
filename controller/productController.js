const productList = require('../db/db');
const categoresList = require('../db/categorydb');
const z  = require('zod')

// check valid id
const checkId= (req,res,next,val)=>{
    console.log(val)
    const product = productList.find((product) => product.id == val);
    if(!product){
        return res.status(404).json({
            status:"error",
            message:"invalid id"
        })
    }
    next();
}
const getAllProdect = (req,res)=>{
    res.json(productList);
}
const getSingleProduct = (req,res)=>{
    const product = productList.find((product) => product.id == req.params.id);
    res.json(product);
    
}

const validateData = (req,res,next)=>{
    try {
        const schema = z.object({  
            name: z.string().min(3),
            price: z.number(),
            categoryId: z.number(),
           
        });
    
        req.body = schema.parse(req.body);
        next();
        } catch (error) {
        res.status(400).json(error.issues);
        }
}
const addItem = (req,res)=>{
    const validId = categoresList.find(el => el.id == req.body.categoryId);
    const productIdList=productList.map(el=> el.id);
    const largestId=Math.max(...productIdList);
    if(validId){
        productList.push({id:(largestId+1),...req.body});
        res.status(201).json({
            status:"item added",
            id:(largestId+1),
            ...req.body
        })
    }else {
        res.status(400).json({
            status:'error',
            message:'invalid id'
        });
    }

}
const updateItem =(req,res)=>{
    const i = productList.findIndex((product) => product.id ===req.params.id*1 );
    productList[i] = Object.assign({}, productList[i], req.body); 
    res.status(201).json({
        status:"item updated",
        
    });
}
const deleteItem = (req,res)=>{
    const product = productList.find((product) => product.id == req.params.id);
    productList.splice(productList.indexOf(product),1);
    res.status(202).json({
        status:"item deleted",
      
    })

}

module.exports = 
[
    getAllProdect,
    getSingleProduct,
    checkId,
    validateData,
    addItem,
    deleteItem,
    updateItem
]