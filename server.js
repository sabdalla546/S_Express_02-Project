const express = require('express');
const productRouter = require('./routes/productRouter');
const categoryRouter = require('./routes/categoryRouter')
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
const app = express();

app.use(express.json());
app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.listen(3000, ()=>{
    console.log('server is runing in port 3000');
});

