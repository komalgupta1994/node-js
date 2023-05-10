const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/404');
const sequelize = require('./utils/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
// express is middleware and framework for makes life easy 
const app = express();

// Set up EJS template engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// this is use for expose the static/public files/folder to outside of world
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    }).catch(err => console.log('error when setting up middleware', err));
})

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use('/', errorController.errorMessage);

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});

User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize.sync().then(result => {
    return User.findByPk(1);
})
    .then(user => {
        if (!user)
            return User.create({ name: 'Komal', emailId: 'komal@gmail.com' });
        return user;
    }).then(user => {
        return user.createCart();
    })
    .then(() => {
        app.listen(3001);
    })
    .catch(err => console.log('err', err));
