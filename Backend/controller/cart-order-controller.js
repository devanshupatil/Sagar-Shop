// import supabase from "../config/database";
const CartOrderModel = require("../models/cart-order-model")
const ProductModel = require("../models/products-model")

const addToCart = async (req, res) => {


    try {

        const { userId, productId } = req.params;

        if (!userId || !productId) {
            throw new Error('Invalid ID');
        }

        const product = await ProductModel.getById(productId);
        const stock_quantity = 1;

        if (!product) {
            throw new Error('Product not found');
        }
        const data = await CartOrderModel.addToCart(userId, productId, stock_quantity);
        res.status(200).json(data);

    }
    catch (error) {
        console.error('Error adding to cart:', error);
        throw new Error('Server Error: Unable to add to cart');
    }
}

const getAllCart = async (req, res) => {


    try {
        const { userId } = req.params;
        if (!userId) {
            throw new Error('Invalid ID');
        }
        const data = await CartOrderModel.getAllCart(userId);
        res.status(200).json(data);
    }
    catch (error) {
        console.error('Error getting cart:', error);
        throw new Error('Server Error: Unable to get cart');
    }
}

const getCartById = async (req, res) => {

    try {
        const { userId, productId } = req.params;

        if (!productId || !userId) {
            throw new Error('Invalid ID');
        }

        const data = await CartOrderModel.getCartById(userId, productId);
        res.status(200).json(data);

    }
    catch (error) {
        console.error('Error getting cart:', error);
        throw new Error('Server Error: Unable to get cart');
    }
}

const updateCart = async (req, res) => {


    try {
        const { cartId, newQuantity } = req.params;
        if (!cartId || !newQuantity) {
            throw new Error('Invalid ID');
        }
        const data = await CartOrderModel.updateCart(cartId, newQuantity);
        res.status(200).json(data);
    }
    catch (error) {
        console.error('Error updating cart:', error);
        throw new Error('Server Error: Unable to update cart');
    }
}

const createOrder = async (req, res) => {


    try {
        const { userId, productId, stockQuantity } = req.params;
        const { transactionId, shippingAddress } = req.body;
        if (!userId, !productId, !transactionId, !shippingAddress, !stockQuantity) {
            throw new Error('Invalid ID');
        }
        const product = await ProductModel.getById(productId);

        if (!product) {
            throw new Error('Product not found');
        }
        if (product.stock_quantity < stockQuantity) {
            throw new Error('Insufficient stock');
        }

        // product.stock_quantity -= stock_quantity;

        const data = await CartOrderModel.createOrder(userId, productId, product, stockQuantity, transactionId, shippingAddress);


        // await product.save();

        res.status(200).json(data);
    }
    catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Server Error: Unable to create order');
    }
}

const getOrdersById = async (req, res) => {


    try {
        const { userId } = req.params;
        if (!userId) {
            throw new Error('Invalid ID');
        }
        const data = await CartOrderModel.getOrdersById(userId);
        if (!data) {
            throw new Error('Order not found');
        }
        res.status(200).json(data);
    }
    catch (error) {
        console.error('Error fetching order:', error);
        throw new Error('Server Error: Unable to retrieve order');
    }
}

const getOrderById = async (req, res) => {

    try {
        const { userId, orderId } = req.params;

        if (!userId || !orderId) {
            throw new Error('Invalid ID');
        }

        const data = await CartOrderModel.getOrderById(userId, orderId);
        res.status(200).json(data);
    }
    catch (error) {
        console.error('Error fetching order:', error);
        throw new Error('Server Error: Unable to retrieve order');
    }
}

const removeProductById = async (req, res) => {

    try {
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            throw new Error('Invalid ID');
        }
        const data = await CartOrderModel.removeProductById(userId, productId);
        res.status(200).json(data);
    }
    catch (error) {
        console.error('Error removing product:', error);
        throw new Error('Server Error: Unable to remove product');
    }
}

const getAllOrders = async (req, res) => {
    try {
        const data = await CartOrderModel.getAllOrders();
        res.status(200).json(data);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error('Server Error: Unable to retrieve orders');
    }
}

const updateOrderStatus = async (req, res) => {

    try {
        const { orderId, newStatus } = req.params;
        if (!orderId || !newStatus) {
            throw new Error('Invalid ID');
        }
        const data = await CartOrderModel.updateOderStatus(orderId, newStatus);
        res.status(200).json(data);
    }
    catch (error) {
        console.error('Error updating order status:', error);
        throw new Error('Server Error: Unable to update order status');
    }
}

module.exports = {

    addToCart,
    getAllCart,
    getCartById,
    updateCart,
    createOrder,
    getOrdersById,
    getOrderById,
    getAllOrders,
    removeProductById,
    updateOrderStatus
}