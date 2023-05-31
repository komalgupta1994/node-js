const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const User = require('./models/user');

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

app.use((req, res, next) => {
   User.findById('647609a41cc028813f48c784').then((user) => {
       req.user = user;
       next();
   }).catch(err => console.log('error from users', err));
})

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use('/', errorController.errorMessage);

mongoose.connect('mongodb+srv://komal_user:Kamli%4012345@cluster0.ozqm2qq.mongodb.net/shop_mongoose?retryWrites=true&w=majority')
    .then(() => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Komal',
                    email: 'komal@gmail.com',
                    cart: {
                        items: []
                    }
                })
                user.save();
            }
            console.log('connected to mongo DB')
            app.listen(3010)
        })
    })
    .catch(err => console.log('error while connecting to mongoose', err));