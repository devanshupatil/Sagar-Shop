// import supabase from "../config/database";
const CartOrderModel = require( "../models/Cart-OrderModel")
const ProductModel = require("../models/ProductsModel")

const addToCart = async (req, res) => {

    
    try{
        
        const {id, product_id, stock_quantity} = req.params;

        if(!id, !product_id, !stock_quantity)
        {
            throw new Error('Invalid ID');
        }

        const product = await ProductModel.getById(product_id);
        if(!product)
        {
            throw new Error('Product not found');
        }
        if(product.stock_quantity < stock_quantity)
        {
            throw new Error('Insufficient stock');
        }
        const data = await CartOrderModel.addToCart(id, product_id, stock_quantity);
        res.status(200).json(data);
        
    }
    catch(error)
    {
        console.error('Error adding to cart:', error);
        throw new Error('Server Error: Unable to add to cart');
    }
}

const getAllCart = async (req, res) => {

    
    try{
        const {user_id} = req.params;
        if(!user_id)
        {
            throw new Error('Invalid ID');
        }
        const data = await CartOrderModel.getAllCart(user_id);
        res.status(200).json(data);
    }
    catch(error)
    {
        console.error('Error getting cart:', error);
        throw new Error('Server Error: Unable to get cart');
    }
}


const createOrder = async (req, res) => {

    
    try{
        const {user_id, product_id, stock_quantity} = req.params;
        if(!user_id, !product_id, !stock_quantity)
        {
            throw new Error('Invalid ID');
        }
        const product = await ProductModel.getById(product_id);

        if(!product)
        {
            throw new Error('Product not found');
        }
        if(product.stock_quantity < stock_quantity)
        {
            throw new Error('Insufficient stock');
        }
        const data = await CartOrderModel.createOrder(user_id, product_id, product);

        res.status(200).json(data);
    }
    catch(error)
    {
        console.error('Error creating order:', error);
        throw new Error('Server Error: Unable to create order');
    }
}

const getOrdersById = async (req, res) => {

    
    try{
        const {user_id} = req.params;
        if(!user_id)
        {
            throw new Error('Invalid ID');
        }
        const data = await CartOrderModel.getOrdersById(user_id);
        if(!data)
        {
            throw new Error('Order not found');
        }
        res.status(200).json(data);
    }
    catch(error)
    {
        console.error('Error fetching order:', error);
        throw new Error('Server Error: Unable to retrieve order');
    }
}

module.exports={

    addToCart,
    getAllCart,
    createOrder,
    getOrdersById,
}