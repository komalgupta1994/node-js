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

exports.postAddEditProduct = (req, res, next) => {
    const body = req.body;
    let product;
    if (body.id) {
        product = new Product(body.id, body.title, body.imageUrl, body.desc, body.price);
    } else {
        product = new Product(null, body.title, body.imageUrl, body.desc, body.price);
    }
    product.saveProduct();
    res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
    Product.fetchAllProduct((products) => {
        res.render('admin/products', { 
            products, 
            docTitle: 'Admin Products', 
            path: '/admin/products'
        });
    });  
}

exports.deleteProduct = (req, res, next) => {
    Product.deleteProduct(req.body.productId, () => {
        res.redirect('/admin/products');
    })
}