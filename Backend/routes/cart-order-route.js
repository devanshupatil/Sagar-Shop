const express = require('express');
const router = express.Router();
// const verifyToken  = require('../middleware/auth');

const { createOrder, getAllCart, updateCart ,getOrdersById } = require('../controller/cart-order-controller');
const { addToCart, removeProductById } = require('../controller/cart-order-controller');


// router.use(verifyToken);


router.post('/add-to-cart/:userId/:productId', addToCart)

router.get('/carts/:userId', getAllCart);

router.put('/carts/:cartId/:newQuantity', updateCart);

router.get('/orders/:userId', getOrdersById);

router.post('/orders/:userId/:productId', createOrder);

router.delete('/remove-product-from-carts/:userId/:productId', removeProductById);


module.exports = router;

