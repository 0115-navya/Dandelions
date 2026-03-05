// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Toaster } from 'react-hot-toast'

import { loadUserFromToken } from './features/auth/authSlice'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import OrderSuccess from './pages/OrderSuccess'
import MyOrders from './pages/MyOrders'
import AboutUs from './pages/AboutUs'

function App() {
  const dispatch = useDispatch()

  // On app load, try to restore user session from token in localStorage
  useEffect(() => {
    dispatch(loadUserFromToken())
  }, [dispatch])

  return (
    <Router>
      {/* Toast notifications — shows anywhere in app */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontFamily: 'Poppins, sans-serif' },
          success: { style: { background: '#fbf1d3', color: '#c43a6d' } },
        }}
      />

      {/* Navbar shows on every page */}
      <Navbar />

      <Routes>
        {/* Public routes — anyone can visit */}
        <Route path="/"               element={<Home />} />
        <Route path="/shop"           element={<Shop />} />
        <Route path="/product/:id"    element={<ProductDetail />} />
        <Route path="/cart"           element={<Cart />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/register"       element={<Register />} />
        <Route path="/about"          element={<AboutUs />} />

        {/* Protected routes — must be logged in */}
        <Route path="/checkout"       element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/order-success"  element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
        <Route path="/my-orders"      element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
      </Routes>

      {/* Footer shows on every page */}
      <Footer />
    </Router>
  )
}

export default App
