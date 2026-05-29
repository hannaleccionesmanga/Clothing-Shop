const Product = require('../models/productModel');

const getProducts = async (req, res) => {
    try {
        const { category_id, search } = req.query;
        const products = await Product.findAll({ category_id, search });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching products' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching product' });
    }
};

const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        if (req.file) {
            productData.image = `/uploads/${req.file.filename}`;
        }

        const product = await Product.create(productData);
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating product' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productData = req.body;
        if (req.file) {
            productData.image = `/uploads/${req.file.filename}`;
        }

        const product = await Product.update(req.params.id, productData);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating product' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.delete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error deleting product' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
