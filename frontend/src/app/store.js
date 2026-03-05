// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import authReducer from '../features/auth/authSlice'
import orderReducer from '../features/orders/orderSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    orders: orderReducer,
  },
})
