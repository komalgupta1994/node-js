const products = [];

exports.getAddProducts = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {
        docTitle: 'Add Product', 
        path: '/admin/add-product', 
        addProductActive: true, 
        formsCss: true, 
        productCss: true
    });
};

exports.postAddProduct = (req, res, next) => {
    console.log(req.body)
    products.push({title: req.body.title})
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    console.log('in middleware', products);
   
    res.render('shop', { 
        products, 
        docTitle: 'Dynamic Shop', 
        path: '/', 
        hasProduct: products.length > 0, 
        shopActive: true, 
        productCss: true 
    });
};