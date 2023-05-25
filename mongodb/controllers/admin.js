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

    Product.fetchById(prodId).then(product => {
        res.render('admin/edit-product', {
            docTitle: 'Edit Product',
            path: '/admin/edit-product',
            isEdit: editMode,
            product
        });
    }).catch(err => console.log('err for product detail', err));
};

exports.postAddEditProduct = (req, res, next) => {
    const { title, imageUrl, description, price, id } = req.body;
    const product = new Product(title, description, price, imageUrl, id, req.user._id);
    product.saveProduct().then(result => {
        console.log('created new product', result);
        res.redirect('/admin/products')
    }).catch(err => console.log('error from created product', err));
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                products,
                docTitle: 'Admin Products',
                path: '/admin/products'
            });
        }).catch(err => console.log('admin get products', err));
}

exports.deleteProduct = (req, res, next) => {
    Product.delete(req.body.productId).then(() => {
        res.redirect('/admin/products');
    }).catch(err => console.log('error from delete product', err));
}