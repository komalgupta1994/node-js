const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/404');

// express is middleware and framework for makes life easy 
const app = express();

// Set up EJS template engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// this is use for expose the static/public files/folder to outside of world
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use('/', errorController.errorMessage);

app.listen(3001);