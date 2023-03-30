const express = require('express');
const bodyParser = require('body-parser');
// express is middleware and framework for makes life easy 
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

// use method is call on every incoming request
app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"/><button type="submit">Add Product</button></form>')
})

app.post('/product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/');
})

app.use('/', (req, res, next) => {
    console.log('in middleware');
    res.send('<h1>Hello from express js</h1>')
    // next(); // Allows the request to continue to the next middleware in the line, without next it will not go in next use method
})

app.listen(3001);