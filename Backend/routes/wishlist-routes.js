const express = require('express');
const router = express.Router();

const { addToWishlist, removeFromWishlist, getAllProducts, getById } = require('../controller/wishlist-controller');

router.post('/add-to-wishlist/:userId/:productId', addToWishlist);
router.delete('/remove-from-wishlist/:userId/:productId', removeFromWishlist);
router.get('/wishlist/:userId', getAllProducts);
router.get('/wishlist/:userId/:productId', getById);

module.exports = router;