// backend/routes/productRoutes.js
// For now products are in frontend data/products.js
// When you're ready, move products to MongoDB and use these routes

const express = require('express')
const router = express.Router()

// ── GET /api/products  →  All products ────────────────────
router.get('/', (req, res) => {
  // TODO: replace with Product.find() from MongoDB once you create the Product model
  res.json({ message: 'Products route ready — connect MongoDB model here' })
})

// ── GET /api/products/:id ──────────────────────────────────
router.get('/:id', (req, res) => {
  res.json({ message: `Get product ${req.params.id}` })
})

module.exports = router
