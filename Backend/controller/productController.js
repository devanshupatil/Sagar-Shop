const products = require("../models/ProductsModel");

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
        const { id } = req.params;
        const product = await products.getById(id);

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
        const { id } = req.params;
        const stock = await products.checkProductStock(id);

        if (!stock) {
            return res.status(404).json({ message: "Product not available" });
        }
        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};





module.exports = {
    getProducts,
    getProductById,
    checkProductStock,
};
