const Product = require('../models/product');
const Cart = require('../models/cart');

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

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.getProductDetail(productId, (product) => {
        Cart.addProduct(productId, product.price);
        res.redirect('/cart');
    })
    console.log('productId', productId);
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

exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId;
    Product.getProductDetail(productId, (product) => {
        res.render('shop/product-detail', {
            path: '/products',
            docTitle: product.title,
            product
        })
    })
}