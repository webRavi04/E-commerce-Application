const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const authMiddleware = require('../middleware/authMiddleware');

// Get user's cart
router.get('/cart', authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add item to cart
router.post('/cart', authMiddleware, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId: req.user.userId });
        if (!cart) {
            cart = new Cart({ userId: req.user.userId, items: [{ productId, quantity }] });
        } else {
            const existingItem = cart.items.find(item => item.productId.equals(productId));
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }
        await cart.save();
        res.json({ message: 'Item added to cart successfully', data: cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update item in cart
router.put('/cart/:productId', authMiddleware, async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const cart = await Cart.findOne({ userId: req.user.userId });
        const item = cart.items.find(item => item.productId.equals(productId));
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        item.quantity = quantity;
        await cart.save();
        res.json({ message: 'Cart updated successfully', data: cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove item from cart
router.delete('/cart/:productId', authMiddleware, async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ userId: req.user.userId });
        cart.items = cart.items.filter(item => !item.productId.equals(productId));
        await cart.save();
        res.json({ message: 'Item removed from cart successfully', data: cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
