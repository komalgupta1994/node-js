const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// express is middleware and framework for makes life easy 
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

// this is use for expose the static/public files/folder to outside of world
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use('/', (req, res) => {
    // res.send('<h1>Page Not Found</h1>')
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3001);