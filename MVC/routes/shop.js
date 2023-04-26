const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');

const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/product-list', shopController.getProducts);

router.get('/cart', shopController.getCart)

router.get('/checkout', shopController.getCheckout)

router.get('/orders', shopController.getOrders)

router.get('/product-detail/:productId', shopController.getProductDetail);

module.exports = router;