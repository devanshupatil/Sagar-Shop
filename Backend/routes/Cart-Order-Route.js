const express = require('express');
const router = express.Router();
// const verifyToken  = require('../middleware/auth');

const { createOrder, getAllCart, getOrdersById } = require('../controller/Cart-Order-Controller');
const { addToCart } = require('../controller/Cart-Order-Controller');


// router.use(verifyToken);


router.post('/add-to-cart/:userId/:productId/:stockQuantity', addToCart)

router.get('/cart/:userId', getAllCart);

router.get('/orders/:userId', getOrdersById);

router.post('/orders/:userId/:productId/:stockQuantity', createOrder);

module.exports = router;

