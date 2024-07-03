const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const authMiddleware = require('../middleware/authMiddleware');

// Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get product by id
router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Create a new product
router.post('/products', authMiddleware, async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Product created successfully', data: product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a product
router.put('/products/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        res.json({ message: 'Product updated successfully', data: product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a product
router.delete('/products/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        res.json({ message: 'Product deleted successfully', data: product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
