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

    Product.getProductDetail(prodId).then(([product]) => {
        console.log('product', product, editMode)
        res.render('admin/edit-product', {
            docTitle: 'Edit Product',
            path: '/admin/edit-product',
            isEdit: editMode,
            product: product[0]
        });
    }).catch(err => console.log('err for product detail', err));
};

exports.postAddEditProduct = (req, res, next) => {
    const body = req.body;
    let product;
    if (body.id) {
        product = new Product(body.id, body.title, body.imageUrl, body.desc, body.price);
    } else {
        product = new Product(null, body.title, body.imageUrl, body.desc, body.price);
    }
    product.saveProduct().then(() => {
        res.redirect('/admin/products')
    }).catch(err => console.log('err from add edit products', err));
}

exports.getProducts = (req, res, next) => {
    Product.fetchAllProduct().then(([products, fieldData]) => {
        res.render('admin/products', {
            products,
            docTitle: 'Admin Products',
            path: '/admin/products'
        });
    }).catch(err => console.log('admin get products', err));
}

exports.deleteProduct = (req, res, next) => {
    Product.deleteProduct(req.body.productId, () => {
        res.redirect('/admin/products');
    })
}