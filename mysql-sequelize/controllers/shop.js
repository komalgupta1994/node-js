const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/index', {
            products,
            docTitle: 'Shop',
            path: '/'
        });
    }).catch(err => console.log('err from index page', err));
};

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/product-list', {
            products,
            docTitle: 'Product List',
            path: '/product-list'
        });
    }).catch(err => console.log('err from index page', err));
};

exports.getCart = (req, res, next) => {
    req.user.getCart().then(cart => {
        console.log('data from cart', cart);
        return cart.getProducts()
    }).then(products => {
        console.log('products from cart', products, products[0].cartItem);
        res.render('shop/cart', {
            path: '/cart',
            docTitle: 'Cart',
            products,
        })
    }).catch(err => console.log('error from get cart', err));
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart().then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: productId } })
    })
        .then(products => {
            let product;
            if (products.length) {
                product = products[0];
            }
            
            if (product) {
                let oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(productId);
        })
        .then(product => {
           return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity }
            });
        })
        .then(cart => {
            res.redirect('/cart');
        })
        .catch(err => console.log('err for add cart', err));
}

exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByPk(productId).then((product) => {
        res.render('shop/product-detail', {
            path: '/products',
            docTitle: product.title,
            product
        })
    }).catch(err => console.log('err for product detail', err));
}

exports.deleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({where: {id: prodId}});
    })
    .then(products => {
        return products[0].cartItem.destroy();
    })
    .then(() => {
        res.redirect('/cart');
    })
    .catch(err => console.log('err for delete cart', err));
}

exports.createOrders = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        return req.user.createOrder().then(order => {
            return order.addProducts(products.map(product => {
                product.orderItem = {quantity: product.cartItem.quantity};
                return product;
            }))
        })
    })
    .then(() => {
        return fetchedCart.setProducts(null);
    })
    .then(() => res.redirect('/orders'))
    .catch(err => console.log('error from create order', err));
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders({include: ['products']})
    .then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            docTitle: 'Orders',
            orders
        })
    })
    .catch(err => console.log('error while fetching orders', err));
}