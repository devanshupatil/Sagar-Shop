const products = require("../models/products-model");
const fs = require('fs');
const csv = require('csv-parser');

const getProducts = async (req, res) => {
    
    
    try {
        const allProducts = await products.getAll();


        if (!allProducts || allProducts.length === 0) {
            return res.status(404).json({ message: "Products not available" });
        }
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getProductById = async (req, res) => {

    try {
        const { productId } = req.params;
        const product = await products.getById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not available" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const checkProductStock = async (req, res) => {
    try {
        const { productId } = req.params;
        const stock = await products.checkProductStock(productId);

        if (!stock) {
            return res.status(404).json({ message: "Product not available" });
        }
        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


function parseCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
}

const createProduct = async (req, res) => {


    try {

        const filePath = '../file.csv'; // Path to your CSV file

        // Parse CSV
        const parsedData = await parseCSV(filePath);


        const { name, description, price, stockQuantity, image, type, heading, mrp, inFrontpage } = req.body;
        const product = await products.createProduct(name, description, price, stockQuantity, image, type, heading, mrp, inFrontpage);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};





module.exports = {
    getProducts,
    getProductById,
    checkProductStock,
    createProduct
};
