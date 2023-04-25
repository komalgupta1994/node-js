const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.fetchAllProduct((products) => {
        res.render('shop/index', { 
            products, 
            docTitle: 'Shop', 
            path: '/'
        });
    });  
};

exports.getProducts = (req, res, next) => {
    Product.fetchAllProduct((products) => {
        res.render('shop/product-list', { 
            products, 
            docTitle: 'Product List', 
            path: '/product-list'
        });
    });  
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        docTitle: 'Cart'
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        docTitle: 'Orders'
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        docTitle: 'Checkout'
    })
}