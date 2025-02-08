const express = require('express');
const router = express.Router();
// const verifyToken  = require('../middleware/auth');

const { createOrder, getAllCart, getOrdersById } = require('../controller/Cart-OrderController');
const { addToCart } = require('../controller/Cart-OrderController');


// router.use(verifyToken);


router.post('/add-to-cart/:id/:product_id/:stock_quantity', addToCart)

router.get('/cart/:user_id', getAllCart);

router.get('/orders/:user_id', getOrdersById);

router.post('/orders/:user_id/:product_id/:stock_quantity', createOrder);

module.exports = router;

