const Product = require('../models/product');
// const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.find().then(products => {
        res.render('shop/index', {
            products,
            docTitle: 'Shop',
            path: '/'
        });
    }).catch(err => console.log('err from index page', err));
};

exports.getProducts = (req, res, next) => {
    // Mongoose find method
    Product.find().then(products => {
        res.render('shop/product-list', {
            products,
            docTitle: 'Product List',
            path: '/product-list'
        });
    }).catch(err => console.log('err from index page', err));
};

exports.getCart = (req, res, next) => {
    req.user.getCart().then(products => {
        res.render('shop/cart', {
            path: '/cart',
            docTitle: 'Cart',
            products,
        })
    }).catch(err => console.log('error from get cart', err));
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.fetchById(productId).then(product => {
        return req.user.addToCart(product);
    }).then(cart => {
        res.redirect('/cart');
    }).catch(err => console.log('error while add to cart', err));
}

exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId;
    Product.fetchById(productId).then((product) => {
        console.log('product', product);
        res.render('shop/product-detail', {
            path: '/products',
            docTitle: product.title,
            product
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
    req.user.addOrder()
    .then(() => res.redirect('/orders'))
    .catch(err => console.log('error from create order', err));
}

exports.getOrders = (req, res, next) => {
    req.user.getOrder()
    .then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            docTitle: 'Orders',
            orders
        })
    })
    .catch(err => console.log('error while fetching orders', err));
}