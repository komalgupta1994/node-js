const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/add-product', {
        docTitle: 'Add Product', 
        path: '/admin/add-product', 
        addProductActive: true, 
        formsCss: true, 
        productCss: true
    });
};

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
