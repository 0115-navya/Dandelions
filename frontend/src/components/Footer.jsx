// src/components/Footer.jsx
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-col-1">
          <img src="/assets/logo.png" alt="Dandelions" style={{ width: '160px' }} />
          <p>Say it with Flowers<br />Use the language of flowers to send your love.</p>
          <img
            src="https://i.postimg.cc/Nj9dgJ98/cards.png"
            alt="payment cards"
            style={{ maxWidth: '200px', marginTop: '12px' }}
          />
        </div>

        {/* Shopping links */}
        <div>
          <h4>SHOPPING</h4>
          <Link to="/shop">Collections</Link>
          <Link to="/shop">Best Sellers</Link>
          <Link to="/shop">Occasions</Link>
        </div>

        {/* Info links */}
        <div>
          <h4>INFORMATION</h4>
          <Link to="/about">About Us</Link>
          <a href="https://payment-method-sb.netlify.app/" target="_blank" rel="noreferrer">
            Payment Method
          </a>
          <a href="https://delivery-status-sb.netlify.app/" target="_blank" rel="noreferrer">
            Express Delivery
          </a>
        </div>

        {/* Newsletter */}
        <div>
          <h4>NEWSLETTER</h4>
          <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.7' }}>
            Be the first to know about latest<br />flower arrangements, sales & promos!
          </p>
          <a href="mailto:navya15jain@gmail.com" style={{ marginTop: '10px' }}>
            Send me an email
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © Navya 2024 | Dandelions Flower Shop</p>
      </div>
    </footer>
  )
}

export default Footer
