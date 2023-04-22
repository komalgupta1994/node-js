const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');

const router = express.Router();

const products = [];

// use method is call on every incoming request
router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {
        docTitle: 'Add Product', 
        path: '/admin/add-product', 
        addProductActive: true, 
        formsCss: true, 
        productCss: true
    });
})

router.post('/product', (req, res, next) => {
    console.log(req.body)
    products.push({title: req.body.title})
    res.redirect('/');
})

module.exports = {
    router,
    products
};