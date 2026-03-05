// src/pages/Shop.jsx
import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const CATEGORIES = [
  { value: 'all', label: 'All Flowers' },
  { value: 'top-sales', label: 'Top Sales' },
  { value: 'new-arrivals', label: 'New Arrivals' },
  { value: 'hot-sales', label: 'Hot Sales' },
]

function Shop() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  // Filter by category
  let filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory)

  // Sort
  if (sortBy === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'name') {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
  }

  return (
    <div style={{ maxWidth: '1200px', width: '90%', margin: '50px auto' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '10px' }}>
        Our Collection
      </h1>
      <p style={{ color: '#aaa', marginBottom: '30px' }}>
        {filtered.length} beautiful arrangements just for you 🌸
      </p>

      {/* ── Filters Bar ───────────────────────────── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '40px',
          background: '#fbf1d3',
          padding: '16px 24px',
          borderRadius: '8px',
        }}
      >
        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              style={{
                padding: '8px 20px',
                border: '2px solid #c43a6d',
                borderRadius: '20px',
                background: activeCategory === cat.value ? '#c43a6d' : 'transparent',
                color: activeCategory === cat.value ? 'white' : '#c43a6d',
                cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '500',
                fontSize: '13px',
                transition: '0.2s',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            background: 'white',
            cursor: 'pointer',
          }}
        >
          <option value="default">Sort by: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {/* ── Product Grid ──────────────────────────── */}
      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Shop
