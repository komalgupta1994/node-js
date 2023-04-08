const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// express is middleware and framework for makes life easy 
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use('/', (req, res) => {
    res.send('<h1>Page Not Found</h1>')
})

app.listen(3001);