const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Cart = require('../models/cart');
const authMiddleware = require('../middleware/authMiddleware');

// Place an order
router.post('/orders', authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }
        const order = new Order({ userId: req.user.userId, items: cart.items });
        await order.save();
        await Cart.findByIdAndDelete(cart._id);
        res.status(201).json({ message: 'Order placed successfully', data: order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all orders (admin only)
router.get('/orders', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const orders = await Order.find().populate('items.productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
