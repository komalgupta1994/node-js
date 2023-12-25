const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndex = (req, res, next) => {
    Product.find().then(products => {
        res.render('shop/index', {
            products,
            docTitle: 'Shop',
            path: '/',
            isAutheticated: req.isLoggedIn
        });
    }).catch(err => console.log('err from index page', err));
};

exports.getProducts = (req, res, next) => {
    // Mongoose find method
    Product.find()
    // .select('title price -_id')
    // .populate('userId')
    .then(products => {
        console.log('products---', products);
        res.render('shop/product-list', {
            products,
            docTitle: 'Product List',
            path: '/product-list',
            isAutheticated: req.isLoggedIn
        });
    }).catch(err => console.log('err from index page', err));
};

exports.getCart = (req, res, next) => {
    req.user
    .populate('cart.items.product')
    .then(user => {
        const products = (user.cart.items || []).map(data => {
            return {
                title: data.product.title,
                quantity: data.quantity,
                _id: data.product._id
            }
        })
        res.render('shop/cart', {
            path: '/cart',
            docTitle: 'Cart',
            products,
            isAutheticated: req.isLoggedIn
        })
    }).catch(err => console.log('error from get cart', err));
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId).then(product => {
        return req.user.addTocart(product);
    }).then(cart => {
        res.redirect('/cart');
    }).catch(err => console.log('error while add to cart', err));
}

exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId).then((product) => {
        console.log('product', product);
        res.render('shop/product-detail', {
            path: '/products',
            docTitle: product.title,
            product,
            isAutheticated: req.isLoggedIn
        })
    }).catch(err => console.log('err for product detail', err));
}

exports.deleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.deleteCart(prodId)
    .then(() => {
        res.redirect('/cart');
    })
    .catch(err => console.log('err for delete cart', err));
}

exports.createOrders = (req, res, next) => {
    req.user.populate('cart.items.product')
        .then(user => {
            const products = user.cart.items.map(data => {
                return {
                    quantity: data.quantity,
                    product: {...data.product._doc}
                }
            })
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            })
            return order.save();
        }).then(() => {
            return req.user.clearCart();
        }).then(() => res.redirect('/orders'))
    .catch(err => console.log('error from create order', err));
}

exports.getOrders = (req, res, next) => {
    Order.find({'user.userId': req.user._id})
    .then(orders => {
        console.log('orders', orders.products);
        res.render('shop/orders', {
            path: '/orders',
            docTitle: 'Orders',
            orders,
            isAutheticated: req.isLoggedIn
        })
    })
    .catch(err => console.log('error while fetching orders', err));
}