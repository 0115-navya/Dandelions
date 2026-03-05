// src/components/ProductCard.jsx
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
import toast from 'react-hot-toast'

// product shape: { _id, name, price, image, category, description, inStock }
function ProductCard({ product }) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    )
    toast.success(`${product.name} added to cart! 🌸`)
  }

  return (
    <div className="product-card">
      {/* Click image → product detail page */}
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
      </Link>

      <p className="product-name">{product.name}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>

      <button className="btn-cart" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
