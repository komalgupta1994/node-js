const express = require('express');
const path = require('path');
const productController = require('../controllers/products');

const router = express.Router();



// use method is call on every incoming request
router.get('/add-product', productController.getAddProducts);

router.post('/product', productController.postAddProduct)

module.exports = router;