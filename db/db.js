const productList = [
    {
        "id": 1,
        "name": "kachu",
        "price": 1,
        "categoryId": 1,
        },
        {
        "id": 2,
        "name": "New Product",
        "price": 10,
        "categoryId":1,
     
        },
        {
        "id": 3,
        "name": "New Product",
        "price": 10,
        "categoryId": 1
        },
        
]
const getProduct = ()=>{
    return productList;
}

module.exports = getProduct();