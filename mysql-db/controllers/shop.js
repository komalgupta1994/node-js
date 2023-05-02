const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.fetchAllProduct().then(([rows, fieldData]) => {
        res.render('shop/index', { 
            products: rows, 
            docTitle: 'Shop', 
            path: '/'
        });
    }).catch(err => console.log('err from index page', err));  
};

exports.getProducts = (req, res, next) => {
    Product.fetchAllProduct().then(([rows, fieldData]) => {
        res.render('shop/product-list', { 
            products: rows, 
            docTitle: 'Product List', 
            path: '/product-list'
        }); 
    }).catch(err => console.log('err from index page', err));  
   
};

exports.getCart = (req, res, next) => {
    Cart.getCartProducts((cartData) => {
        Product.fetchAllProduct().then(([products, fieldData]) => {
            const cartProducts = [];
            for (product of products) {
                const cartProduct = cartData.products.find((cartProd) => cartProd.id === product.id);
                if (cartProduct) {
                    cartProducts.push({product, qty: cartProduct.qty});
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                docTitle: 'Cart',
                products: cartProducts,
                totalPrice: cartData.totalPrice
            })
        })
    })
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.getProductDetail(productId).then(([product]) => {
        Cart.addProduct(productId, product[0].price);
        res.redirect('/cart');
    }).catch(err => console.log('err for product detail', err));
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
    Product.getProductDetail(productId).then(([product]) => {
        res.render('shop/product-detail', {
            path: '/products',
            docTitle: product[0].title,
            product: product[0]
        })
    }).catch(err => console.log('err for product detail', err));
}

exports.deleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    Product.getProductDetail(productId).then(([product]) => {
        Cart.deleteProductFromCart(prodId, product[0].price);
        res.redirect('/cart'); 
    }).catch(err => console.log('err for product detail', err));
}