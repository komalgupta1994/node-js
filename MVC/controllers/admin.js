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

    Product.getProductDetail(prodId, (product) => {
        console.log('product', product, editMode)
        res.render('admin/edit-product', {
            docTitle: 'Edit Product', 
            path: '/admin/edit-product',
            isEdit: editMode,
            product
        });
    })
};

exports.postEditProduct = (req, res, next) => {
    
}

exports.postAddProduct = (req, res, next) => {
    const body = req.body;
    const product = new Product(body.title, body.imageUrl, body.desc, body.price);
    product.saveProduct();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAllProduct((products) => {
        res.render('admin/products', { 
            products, 
            docTitle: 'Admin Products', 
            path: '/admin/products'
        });
    });  
}
