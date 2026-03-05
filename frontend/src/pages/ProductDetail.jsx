// src/pages/ProductDetail.jsx
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
import { getById, products } from '../data/products'
import toast from 'react-hot-toast'
import ProductCard from '../components/ProductCard'

function ProductDetail() {
  const { id } = useParams()   // gets the :id from the URL /product/:id
  const dispatch = useDispatch()
  const product = getById(id)

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>Product not found 😔</h2>
        <Link to="/shop" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
          Back to Shop
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    }))
    toast.success(`${product.name} added to cart! 🌸`)
  }

  // Related products = same category, not this product
  const related = products
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 3)

  return (
    <div style={{ maxWidth: '1100px', width: '90%', margin: '60px auto' }}>
      {/* Breadcrumb */}
      <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '30px' }}>
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}
      </p>

      {/* ── Main Product Area ─────────────────────── */}
      <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '380px',
              height: '380px',
              objectFit: 'cover',
              borderRadius: '8px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }}
          />
        </div>

        {/* Product Info */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '12px' }}>
            {product.name}
          </h1>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#c43a6d', marginBottom: '20px' }}>
            ${product.price.toFixed(2)}
          </p>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '30px' }}>
            {product.description}
          </p>

          {/* Category badge */}
          <span
            style={{
              display: 'inline-block',
              background: '#fdf0f5',
              color: '#c43a6d',
              padding: '5px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '30px',
              textTransform: 'capitalize',
            }}
          >
            {product.category.replace('-', ' ')}
          </span>

          {/* Availability */}
          <p style={{ color: product.inStock ? '#38a169' : '#e53e3e', fontWeight: '600', marginBottom: '24px' }}>
            {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              className="btn-primary"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              style={{ padding: '14px 36px', fontSize: '15px' }}
            >
              Add to Cart 🛒
            </button>
            <Link to="/cart">
              <button className="btn-outline" style={{ padding: '14px 36px', fontSize: '15px' }}>
                View Cart
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Related Products ──────────────────────── */}
      {related.length > 0 && (
        <div style={{ marginTop: '80px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>
            You might also like
          </h2>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
