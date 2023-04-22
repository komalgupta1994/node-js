const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');

const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    console.log('in middleware', adminData.products);
    const products = adminData.products;
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop', {products, docTitle: 'Dynamic Shop', path: '/'});
    // next(); // Allows the request to continue to the next middleware in the line, without next it will not go in next use method
})

module.exports = router;