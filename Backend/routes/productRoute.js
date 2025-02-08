const express = require('express');
const router = express.Router();
const verifyToken  = require('../middleware/auth');
const { getProducts, getProductById, checkProductStock } = require('../controller/productController');


router.use(verifyToken);

router.get('/products', getProducts);

router.get('/products/:id', getProductById);

router.get('/products/stock/:id', checkProductStock);

module.exports = router;


