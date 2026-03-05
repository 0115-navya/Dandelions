// backend/routes/orderRoutes.js
const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const { protect } = require('../middleware/authMiddleware')

// ── POST /api/orders  →  Place a new order (protected) ────
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' })
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    })

    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── GET /api/orders/myorders  →  Get logged-in user's orders
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── GET /api/orders/:id  →  Get single order ──────────────
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })

    // Make sure user can only see their own orders
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
