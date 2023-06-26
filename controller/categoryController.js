const categoresList = require('../db/categorydb');
const z  = require('zod');
console.log()
const checkId= (req,res,next,val)=>{
    console.log(val)
    const category = categoresList.find((category) => category.id == val);
    if(!category){
        return res.status(404).json({
            status:"error",
            message:"invalid id"
        })
    }
    next();
}
const getAllCategory = (req,res)=>{
    res.json(categoresList);
}
const getSingleCategory = (req,res)=>{
    const category = categoresList.find((category) => category.id == req.params.id);
    res.json(category);
    
}
const validateData = (req,res,next)=>{
    try {
        const schema = z.object({
            name: z.string().min(3),
        });
        
        req.body = schema.parse(req.body);
        next();
      } catch (error) {
        res.status(400).json(error.message);
      }
}
const addItem = (req,res)=>{
    const categoresIdList=categoresList.map(el=> el.id);
    const largestId=Math.max(...categoresIdList);
    categoresList.push({id:(largestId+1),...req.body});
    res.status(201).json({
        status:"item added",
        id:(largestId+1),
        ...req.body
    })
}
const updateItem =(req,res)=>{
    const i = categoresList.findIndex((category) => category.id ===req.params.id*1 );
    categoresList[i] = Object.assign({}, categoresList[i], req.body); 
    res.status(201).json({
        status:"item updated",
        
    });
}
const deleteItem = (req,res)=>{
    const category = categoresList.find((catey) => catey.id == req.params.id);
    categoresList.splice(categoresList.indexOf(category),1);
    res.status(202).json({
        status:"item deleted",
        
    })

}
module.exports = [
    checkId,
    getAllCategory,
    getSingleCategory,
    validateData,
    addItem,
    updateItem,
    deleteItem];