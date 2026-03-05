// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'

const loadCart = () => {
  try {
    const saved = localStorage.getItem('dandelions_cart')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const saveCart = (items) => {
  localStorage.setItem('dandelions_cart', JSON.stringify(items))
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(), // [{ _id, name, price, image, quantity }]
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find((i) => i._id === action.payload._id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      saveCart(state.items)
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload)
      saveCart(state.items)
    },

    increaseQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload)
      if (item) item.quantity += 1
      saveCart(state.items)
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload)
      if (item) {
        item.quantity -= 1
        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i._id !== action.payload)
        }
      }
      saveCart(state.items)
    },

    clearCart: (state) => {
      state.items = []
      localStorage.removeItem('dandelions_cart')
    },
  },
})

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions

// ── Selectors ──────────────────────────────────────────────
export const selectCartItems = (state) => state.cart.items
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

export default cartSlice.reducer
