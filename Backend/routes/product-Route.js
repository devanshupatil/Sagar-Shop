const express = require('express');
const router = express.Router();
const verifyToken  = require('../middleware/auth');
const { getProducts, getProductById, checkProductStock } = require('../controller/product-Controller');


router.use(verifyToken);

router.get('/products', getProducts);

router.get('/products/:productId', getProductById);

router.get('/products/stock/:productId', checkProductStock);

module.exports = router;


