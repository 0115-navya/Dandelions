// src/pages/Cart.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from '../features/cart/cartSlice'
import { selectIsLoggedIn } from '../features/auth/authSlice'
import toast from 'react-hot-toast'

function Cart() {
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const count = useSelector(selectCartCount)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRemove = (id, name) => {
    dispatch(removeFromCart(id))
    toast.error(`${name} removed from cart`)
  }

  const handleCheckout = () => {
    if (!isLoggedIn) {
      toast.error('Please login to checkout')
      navigate('/login')
    } else {
      navigate('/checkout')
    }
  }

  // ── Empty Cart State ───────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>🛒</div>
        <p>Your cart is empty!</p>
        <Link to="/shop">
          <button className="btn-primary">Browse Flowers</button>
        </Link>
      </div>
    )
  }

  const shipping = total > 50 ? 0 : 5.99

  return (
    <div className="cart-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Your Cart ({count} items)</h1>
        <button
          onClick={() => { dispatch(clearCart()); toast.success('Cart cleared') }}
          style={{
            background: 'none', border: 'none', color: '#aaa',
            cursor: 'pointer', fontSize: '14px', fontFamily: 'Poppins, sans-serif',
          }}
        >
          Clear all
        </button>
      </div>

      <div className="cart-layout">
        {/* ── Cart Items ────────────────────────────── */}
        <div className="cart-items-list">
          {items.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="item-price">${item.price.toFixed(2)} each</p>

                {/* Quantity controls */}
                <div className="qty-controls">
                  <button onClick={() => dispatch(decreaseQty(item._id))}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(increaseQty(item._id))}>+</button>
                </div>
              </div>

              {/* Item total */}
              <div style={{ textAlign: 'right', minWidth: '80px' }}>
                <p style={{ fontWeight: '700', fontSize: '16px' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Remove button */}
              <button
                className="remove-btn"
                onClick={() => handleRemove(item._id, item.name)}
                title="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* ── Order Summary ─────────────────────────── */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal ({count} items)</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? '🎉 FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>
          {shipping > 0 && (
            <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '8px' }}>
              Add ${(50 - total).toFixed(2)} more for free shipping!
            </p>
          )}
          <div className="summary-row total">
            <span>Total</span>
            <span>${(total + shipping).toFixed(2)}</span>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout →
          </button>

          <Link to="/shop">
            <button
              style={{
                width: '100%', padding: '12px', background: 'transparent',
                border: '1px solid #ddd', borderRadius: '6px', marginTop: '12px',
                cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontSize: '14px',
              }}
            >
              ← Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
