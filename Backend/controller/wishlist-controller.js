const wishlist = require('../models/wishlist-model');

const getAllProducts = async (req, res) => {

    try {
        const { userId } = req.params;
        if (!userId) {
            throw new Error('Invalid ID');
        }
        const data = await wishlist.getAllProducts(userId);
        res.status(200).json(data);
    }
    catch (error) {
        console.error('Error getting wishlist:', error);
        throw new Error('Server Error: Unable to get wishlist');
    }
};

const removeFromWishlist = async (req, res) => {

    try {

        const { userId, productId } = req.params;

        if (!userId || !productId) {
            throw new Error('Invalid ID');
        }

        const data = await wishlist.removeFromWishlist(userId, productId);
        res.status(200).json("Successfully removed from wishlist");
    }
    catch (error) {
        console.error('Error removing from wishlist:', error);
        throw new Error('Server Error: Unable to remove from wishlist');
    }
};

const addToWishlist = async (req, res) => {

    try {
        const { userId, productId } = req.params;

        if (!userId || !productId) {
            throw new Error('Invalid ID');
        }

        const data = await wishlist.addToWishlist(userId, productId);
        res.status(200).json(data);
    }
    catch (error) {
        console.error('Error adding to wishlist:', error);
        throw new Error('Server Error: Unable to add to wishlist');
    }
};

const getById = async (req, res) => {

    try {
        const { userId, productId } = req.params;

        if (!userId || !productId) {
            throw new Error('Invalid ID');
        }
        const data = await wishlist.getById(userId, productId);
        res.status(200).json(data);
    }
    catch (error) {
        console.error('Error getting product:', error);
        throw new Error('Server Error: Unable to get product');
    }
}


module.exports = {
    getAllProducts,
    removeFromWishlist,
    addToWishlist,
    getById

}