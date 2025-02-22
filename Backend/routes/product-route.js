const express = require('express');
const router = express.Router();
const { getProducts, getProductById, checkProductStock } = require('../controller/product-controller');


router.get('/products', getProducts);

router.get('/products/:productId', getProductById);

router.get('/products/stock/:productId', checkProductStock);

module.exports = router;


