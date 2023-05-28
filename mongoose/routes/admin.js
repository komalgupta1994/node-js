const express = require('express');
const path = require('path');
const adminController = require('../controllers/admin');

const router = express.Router();



// use method is call on every incoming request
router.get('/add-product', adminController.getAddProducts);

// edit product get for show info when click on edit button
// router.get('/edit-product/:productId', adminController.editProducts);

router.post('/update-product', adminController.postAddEditProduct);

router.get('/products', adminController.getProducts);

// Save product
router.post('/product', adminController.postAddEditProduct);

// router.post('/delete-product', adminController.deleteProduct);

module.exports = router;