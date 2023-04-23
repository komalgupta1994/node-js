const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');

const router = express.Router();
const productController = require('../controllers/products');

router.get('/', productController.getProducts);

module.exports = router;