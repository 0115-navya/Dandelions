// src/pages/Home.jsx
// Full conversion of your original index.html into React sections
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getByCategory } from '../data/products'

// Blog posts data (was hardcoded in HTML)
const blogPosts = [
  {
    id: 1,
    image: '/assets/cart_items/proposals_flowers.jpg',
    date: '12 February 2026',
    title: 'Picking The Best Ones for Proposals',
   
  },
  {
    id: 2,
    image: '/assets/cart_items/housewarming_flowers.webp',
    date: '17 February 2026',
    title: 'The Health Benefits Of Gifting Flowers',
    
  },
  {
    id: 3,
    image: '/assets/cart_items/birthday_flowers_highlights.webp',
    date: '26 February 2026',
    title: 'Blossoming Smiles to every occasion',
    
  },
]

function Home() {
  const topSales = getByCategory('top-sales')
  const newArrivals = getByCategory('new-arrivals')
  const hotSales = getByCategory('hot-sales')

  return (
    <main>
      {/* ── Hero Section ─────────────────────────── */}
      <section className="hero" id="home">
        <img src="/assets/banner.webp" alt="Dandelions Banner" />
        <div className="hero-text">
          <p className="collection-label">ANNIVERSARY COLLECTION</p>
          <h2>Surprises for <br />Every Celebration</h2>
          <p className="hero-sub">
            Enriching relationships <br />through luxury flower arrangements.
          </p>
          <Link to="/shop">
            <button className="shop-btn">
              SHOP NOW →
            </button>
          </Link>
        </div>
      </section>

      {/* ── Featured Collections ──────────────────── */}
      <section id="collection">
        <div className="collections">
          <div className="collection-card">
            <img src="/assets/cart_items/Roses_400x.webp" alt="Luxury" />
            <div className="collection-overlay">
              <p>Luxury</p>
              <Link to="/shop"><button>SHOP NOW</button></Link>
            </div>
          </div>
          <div className="collection-card">
            <img src="/assets/cart_items/Classic-Mix_400x.webp" alt="Spring Mix" />
            <div className="collection-overlay">
              <p>Spring Mix</p>
              <Link to="/shop"><button>SHOP NOW</button></Link>
            </div>
          </div>
          <div className="collection-card">
            <img src="/assets/cart_items/Wild-Mix_400x.webp" alt="Wild Mix" />
            <div className="collection-overlay">
              <p>Wild Mix</p>
              <Link to="/shop"><button>SHOP NOW</button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Top Sales ────────────────────────────── */}
      <section id="sellers">
        <div className="product-section">
          <h2>Top Sales</h2>
          <div className="product-grid">
            {topSales.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>

        {/* ── New Arrivals ──────────────────────── */}
        <div className="product-section">
          <h2>New Arrivals</h2>
          <div className="product-grid">
            {newArrivals.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>

        {/* ── Hot Sales ─────────────────────────── */}
        <div className="product-section">
          <h2>Hot Sales</h2>
          <div className="product-grid">
            {hotSales.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog Section ─────────────────────────── */}
      <section id="blog" className="blog-section">
        <div className="blog-heading">
          <p className ="blog-heading-text-black">OUR FLORAL STORIES</p>
          <h2>Moments that bloom into memories</h2>
        </div>
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div className="blog-card" key={post.id}>
              <img src={post.image} alt={post.title} />
              <div className="blog-card-content">
                <p className="date">📅 {post.date}</p>
                <h4>{post.title}</h4>
                <a href={post.link} target="_blank" rel="noreferrer">
                  Explore Story
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact Section ──────────────────────── */}
      <section id="contact">
        <div className="contact-section">
          <div className="contact-form">
            <div className="contact-info">
              <h4>INFORMATION</h4>
              <h1>Contact Us</h1>
              <span>Express Your Love with Dandelions</span>
              <h3>Visit us at Store</h3>
              <p>
                Sector-7, Rohini<br />
                New Delhi - 110085<br /><br />
                +91 956049XXXXX
              </p>
            </div>
            <div className="contact-fields">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Your Message" />
              <a href="mailto:navya15jain@gmail.com">
                <button className="submit-btn">SEND MESSAGE</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
