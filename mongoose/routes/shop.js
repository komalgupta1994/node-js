const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');

const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/product-list', shopController.getProducts);

router.get('/cart', shopController.getCart);

// // // Route to get the detail form data, so need to create cart URL with POST method
router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.deleteCartItem);

router.post('/create-order', shopController.createOrders);

router.get('/orders', shopController.getOrders)

router.get('/product-detail/:productId', shopController.getProductDetail);

module.exports = router;