// src/pages/Checkout.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartTotal, clearCart } from '../features/cart/cartSlice'
import { selectUser } from '../features/auth/authSlice'
import { placeOrder, selectOrderLoading, selectOrderSuccess, selectCurrentOrder } from '../features/orders/orderSlice'
import toast from 'react-hot-toast'

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'upi', label: 'UPI / GPay', icon: '📱' },
]

function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const user = useSelector(selectUser)
  const loading = useSelector(selectOrderLoading)
  const success = useSelector(selectOrderSuccess)
  const currentOrder = useSelector(selectCurrentOrder)

  const shipping = cartTotal > 50 ? 0 : 5.99
  const grandTotal = cartTotal + shipping

  // ── Form state ─────────────────────────────────────────
  const [address, setAddress] = useState({
    fullName: user?.name || '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('cod')

  // After order placed successfully → redirect
  useEffect(() => {
    if (success && currentOrder) {
      dispatch(clearCart())
      navigate('/order-success', { state: { order: currentOrder } })
    }
  }, [success, currentOrder, dispatch, navigate])

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    const requiredFields = ['fullName', 'phone', 'addressLine', 'city', 'state', 'pincode']
    for (const field of requiredFields) {
      if (!address[field].trim()) {
        toast.error(`Please fill in ${field}`)
        return
      }
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty!')
      return
    }

    // Dispatch the placeOrder async thunk
    // This sends data to our backend API → creates order in MongoDB
    dispatch(
      placeOrder({
        items: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        })),
        shippingAddress: address,
        paymentMethod,
        itemsPrice: cartTotal,
        shippingPrice: shipping,
        totalPrice: grandTotal,
      })
    )
  }

  if (cartItems.length === 0 && !success) {
    navigate('/cart')
    return null
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="checkout-layout">
          {/* ── Left: Delivery + Payment ───────────── */}
          <div className="checkout-form">
            {/* Delivery Address */}
            <h3>📦 Delivery Address</h3>

            <div className="form-group">
              <label>Full Name *</label>
              <input
                name="fullName"
                value={address.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                name="phone"
                value={address.phone}
                onChange={handleChange}
                placeholder="+91 XXXXXXXXXX"
                required
              />
            </div>

            <div className="form-group">
              <label>Address *</label>
              <input
                name="addressLine"
                value={address.addressLine}
                onChange={handleChange}
                placeholder="House/Flat No., Street, Area"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
              </div>
              <div className="form-group">
                <label>State *</label>
                <input
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Pincode *</label>
              <input
                name="pincode"
                value={address.pincode}
                onChange={handleChange}
                placeholder="6-digit pincode"
                maxLength={6}
                required
              />
            </div>

            {/* Payment Method */}
            <h3 style={{ marginTop: '36px' }}>💳 Payment Method</h3>
            <div className="payment-options">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={`payment-option ${paymentMethod === method.id ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                  />
                  {method.icon} {method.label}
                </label>
              ))}
            </div>

            {/* Place Order button */}
            <button
              type="submit"
              className="place-order-btn"
              disabled={loading}
            >
              {loading ? '⏳ Placing Order...' : `🌸 Place Order — $${grandTotal.toFixed(2)}`}
            </button>
          </div>

          {/* ── Right: Order Summary ───────────────── */}
          <div className="cart-summary">
            <h3>Your Order</h3>

            {/* Item list */}
            <div style={{ marginBottom: '16px' }}>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '12px', fontSize: '14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <div>
                      <p style={{ fontWeight: '500' }}>{item.name}</p>
                      <p style={{ color: '#aaa', fontSize: '12px' }}>x{item.quantity}</p>
                    </div>
                  </div>
                  <span style={{ fontWeight: '600' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE 🎉' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout
