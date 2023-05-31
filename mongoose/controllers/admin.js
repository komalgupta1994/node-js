const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        docTitle: 'Add Product',
        path: '/admin/add-product',
        isEdit: false,
        product: {}
    });
};

exports.editProducts = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;

    Product.findById(prodId).then(product => {
        res.render('admin/edit-product', {
            docTitle: 'Edit Product',
            path: '/admin/edit-product',
            isEdit: editMode,
            product
        });
    }).catch(err => console.log('err for product detail', err));
};

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, description, price } = req.body;
    const product = new Product({
        title, 
        description, 
        price, 
        imageUrl,
        userId: req.user
    });
    // this save method comes from mongoose, we didn't define anywhere
    product.save().then(result => {
        console.log('created new product', result);
        res.redirect('/admin/products')
    }).catch(err => console.log('error from created product', err));
}

exports.postEditProducts = (req, res, next) => {
    const body = req.body;
    const prodId = body.id;
    Product.findById(prodId).then(product => {
        product.title = body.title;
        product.description = body.description;
        product.price = body.price;
        product.imageUrl = body.imageUrl;
        product.save().then(() => {
            res.redirect('/admin/products')
        })
    }).catch(err => console.log('error while editing product', err));
}

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('admin/products', {
                products,
                docTitle: 'Admin Products',
                path: '/admin/products'
            });
        }).catch(err => console.log('admin get products', err));
}

exports.deleteProduct = (req, res, next) => {
    Product.findByIdAndRemove(req.body.productId).then(() => {
        res.redirect('/admin/products');
    }).catch(err => console.log('error from delete product', err));
}