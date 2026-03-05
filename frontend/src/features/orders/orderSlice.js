// src/features/orders/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('dandelions_token')}`,
  },
})

// ── Async Thunks ───────────────────────────────────────────

export const placeOrder = createAsyncThunk(
  'orders/place',
  async (orderData, { rejectWithValue }) => {
    // orderData = { items, shippingAddress, paymentMethod, totalPrice }
    try {
      const { data } = await axios.post(`${API}/orders`, orderData, authHeader())
      return data // the created order
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to place order')
    }
  }
)

export const fetchMyOrders = createAsyncThunk(
  'orders/fetchMine',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/orders/myorders`, authHeader())
      return data // array of orders
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders')
    }
  }
)

// ── Slice ──────────────────────────────────────────────────

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    currentOrder: null, // the just-placed order
    myOrders: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetOrderSuccess: (state) => {
      state.success = false
      state.currentOrder = null
    },
  },
  extraReducers: (builder) => {
    // Place order
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.currentOrder = action.payload
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Fetch my orders
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false
        state.myOrders = action.payload
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { resetOrderSuccess } = orderSlice.actions

// ── Selectors ──────────────────────────────────────────────
export const selectCurrentOrder = (state) => state.orders.currentOrder
export const selectMyOrders = (state) => state.orders.myOrders
export const selectOrderLoading = (state) => state.orders.loading
export const selectOrderSuccess = (state) => state.orders.success
export const selectOrderError = (state) => state.orders.error

export default orderSlice.reducer
