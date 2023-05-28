const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

// const User = require('./models/user');

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

// app.use((req, res, next) => {
//    User.findById('646dceceb592a799774456b9').then((user) => {
//        req.user = new User(user.name, user.email, user.cart, user._id);
//        next();
//    }).catch(err => console.log('error from users', err));
// })

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use('/', errorController.errorMessage);

mongoose.connect('mongodb+srv://komal_user:Kamli%4012345@cluster0.ozqm2qq.mongodb.net/shop_mongoose?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to mongo DB')
        app.listen(3010)
    })
    .catch(err => console.log('error while connecting to mongoose', err));