const express = require('express');
const router = express.Router();
// const verifyToken  = require('../middleware/auth');

const { createOrder, getAllCart, updateCart ,getOrdersById } = require('../controller/cart-order-controller');
const { addToCart, removeProductById, getCartById } = require('../controller/cart-order-controller');
const { getOrderById, getAllOrders } = require('../controller/cart-order-controller');
const { updateOrderStatus } = require('../controller/cart-order-controller');

// router.use(verifyToken);


router.post('/add-to-cart/:userId/:productId', addToCart)

router.get('/carts/:userId', getAllCart);

router.get('/carts/:userId/:productId', getCartById);

router.put('/carts/:cartId/:newQuantity', updateCart);

router.get('/orders/:userId', getOrdersById);

router.get('/order/:userId/:orderId', getOrderById);

router.post('/orders/:userId/:productId/:stockQuantity', createOrder);

router.get('/orders', getAllOrders);

router.put('/order-status/:orderId/:newStatus', updateOrderStatus);

router.delete('/remove-product-from-carts/:userId/:productId', removeProductById);


module.exports = router;

