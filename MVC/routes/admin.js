const express = require('express');
const path = require('path');
const adminController = require('../controllers/admin');

const router = express.Router();



// use method is call on every incoming request
router.get('/add-product', adminController.getAddProducts);

router.get('/products', adminController.getProducts);

// router.get('/products', adminController.getProducts);

// Save product
router.post('/product', adminController.postAddProduct)

module.exports = router;