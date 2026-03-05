// backend/routes/authRoutes.js
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { protect } = require('../middleware/authMiddleware')

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// ── POST /api/auth/register ────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // Create user (password will be hashed by pre-save hook in model)
    const user = await User.create({ name, email, password })

    res.status(201).json({
      user: { _id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── POST /api/auth/login ───────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    // Check user exists AND password is correct
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    res.json({
      user: { _id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── GET /api/auth/me  (protected) ─────────────────────────
// Used to restore session from token on app load
router.get('/me', protect, async (req, res) => {
  res.json({
    user: { _id: req.user._id, name: req.user.name, email: req.user.email },
  })
})

module.exports = router
