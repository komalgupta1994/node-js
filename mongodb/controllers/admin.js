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
    console.log('req--', req.body);
    const {title, imageUrl, description, price, id} = req.body;
    // let product;
    // if (id) {
    //     Product.findByPk(id).then(product => {
    //         product.title = title;
    //         product.imageUrl = imageUrl;
    //         product.description = description;
    //         product.price = price;
    //         return product.save();
    //     }).then(() => {
    //         res.redirect('/admin/products')
    //     })
    //     .catch(err => console.log('error from edit product', err));
    // } else {
        const product = new Product(title, description, price, imageUrl);
        product.saveProduct().then(result => {
            console.log('created new product', result);
            res.redirect('/admin/products')
        }).catch(err => console.log('error from created product', err));
    // }
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

// exports.deleteProduct = (req, res, next) => {
//     Product.findByPk(req.body.productId).then(product => {
//         return product.destroy();
//     }).then(() => {
//         res.redirect('/admin/products');
//     }).catch(err => console.log('error from delete product', err));
// }