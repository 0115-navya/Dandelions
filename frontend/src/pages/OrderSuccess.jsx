// src/pages/OrderSuccess.jsx
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetOrderSuccess } from '../features/orders/orderSlice'

function OrderSuccess() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const order = state?.order

  useEffect(() => {
    // Reset the order success flag so it doesn't redirect again
    dispatch(resetOrderSuccess())
  }, [dispatch])

  if (!order) {
    navigate('/')
    return null
  }

  return (
    <div className="success-page">
      <div className="success-icon">🎉</div>
      <h1>Order Placed!</h1>
      <p>
        Thank you for your order, <strong>{order.shippingAddress?.fullName}</strong>!<br />
        Your beautiful flowers are being prepared with love. 🌸
      </p>

      {/* Order details card */}
      <div
        style={{
          background: '#fbf1d3',
          borderRadius: '12px',
          padding: '28px',
          marginBottom: '32px',
          textAlign: 'left',
        }}
      >
        <h3 style={{ fontWeight: '600', marginBottom: '16px' }}>Order Summary</h3>

        {order.items?.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
              marginBottom: '8px',
            }}
          >
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <hr style={{ margin: '16px 0', borderColor: '#e0d5b0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
          <span>Total Paid</span>
          <span style={{ color: '#c43a6d' }}>${order.totalPrice?.toFixed(2)}</span>
        </div>

        <p style={{ marginTop: '16px', fontSize: '14px', color: '#888' }}>
          📦 Delivering to: {order.shippingAddress?.addressLine},{' '}
          {order.shippingAddress?.city}, {order.shippingAddress?.state}
        </p>

        <p style={{ fontSize: '14px', color: '#888' }}>
          💳 Payment: {order.paymentMethod?.toUpperCase()}
        </p>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/my-orders">
          <button className="btn-primary">View My Orders</button>
        </Link>
        <Link to="/shop">
          <button className="btn-outline">Continue Shopping</button>
        </Link>
      </div>
    </div>
  )
}

export default OrderSuccess
