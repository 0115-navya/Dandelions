// src/pages/MyOrders.jsx
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMyOrders, selectMyOrders, selectOrderLoading } from '../features/orders/orderSlice'

function MyOrders() {
  const dispatch = useDispatch()
  const orders = useSelector(selectMyOrders)
  const loading = useSelector(selectOrderLoading)

  useEffect(() => {
    dispatch(fetchMyOrders())
  }, [dispatch])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <p style={{ fontSize: '18px' }}>Loading your orders... ⏳</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '900px', width: '90%', margin: '60px auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '30px' }}>
        My Orders 📦
      </h1>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fbf1d3', borderRadius: '12px' }}>
          <p style={{ fontSize: '60px', marginBottom: '16px' }}>📭</p>
          <p style={{ color: '#aaa', fontSize: '16px', marginBottom: '24px' }}>
            You haven't placed any orders yet!
          </p>
          <Link to="/shop">
            <button className="btn-primary">Start Shopping</button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                background: '#fbf1d3',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              {/* Order header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <p style={{ fontSize: '13px', color: '#aaa' }}>Order ID</p>
                  <p style={{ fontWeight: '600', fontSize: '14px' }}>#{order._id}</p>
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: '#aaa' }}>Date</p>
                  <p style={{ fontSize: '14px' }}>
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: '#aaa' }}>Total</p>
                  <p style={{ fontWeight: '700', color: '#c43a6d', fontSize: '16px' }}>
                    ${order.totalPrice?.toFixed(2)}
                  </p>
                </div>
                <span
                  style={{
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                    background: order.isDelivered ? '#d4edda' : '#fff3cd',
                    color: order.isDelivered ? '#155724' : '#856404',
                  }}
                >
                  {order.isDelivered ? '✅ Delivered' : '🚚 In Transit'}
                </span>
              </div>

              {/* Items */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {order.items?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '500' }}>{item.name}</p>
                      <p style={{ fontSize: '12px', color: '#aaa' }}>×{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders
