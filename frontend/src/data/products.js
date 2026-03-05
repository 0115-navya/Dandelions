// src/data/products.js
// All your products from the original HTML — now as proper JS data
// When backend is ready, this will come from MongoDB via API instead

export const products = [
  // ── TOP SALES ──────────────────────────────────────────
  {
    _id: "p001",
    name: "Classic Cubo",
    price: 37.24,
    image: "/assets/cart_items/Roses-Mix_400x.webp",
    category: "top-sales",
    description: "A luxurious cube arrangement of classic roses, perfect for anniversaries and special occasions.",
    inStock: true,
  },
  {
    _id: "p002",
    name: "Classic Grande",
    price: 17.24,
    image: "/assets/cart_items/Spring-Mix_400x.webp",
    category: "top-sales",
    description: "A grand spring mix bouquet that brings freshness and elegance to any room.",
    inStock: true,
  },
  {
    _id: "p003",
    name: "Crystal Grande",
    price: 27.24,
    image: "/assets/cart_items/Vibrant-GraneRonde_400x.webp",
    category: "top-sales",
    description: "Vibrant and radiant grande ronde arrangement — a feast for the eyes.",
    inStock: true,
  },
  {
    _id: "p004",
    name: "Petite Ronde",
    price: 43.67,
    image: "/assets/cart_items/Lollipop-Wild-Mix_400x.webp",
    category: "top-sales",
    description: "A petite yet stunning ronde with wild mix flowers for a playful touch.",
    inStock: true,
  },

  // ── NEW ARRIVALS ───────────────────────────────────────
  {
    _id: "p005",
    name: "Lollipop Wild Mix",
    price: 10.23,
    image: "/assets/cart_items/StardustClassicRonde_400x.webp",
    category: "new-arrivals",
    description: "Stardust-inspired classic ronde — a whimsical new arrival you'll adore.",
    inStock: true,
  },
  {
    _id: "p006",
    name: "Stardust Classic",
    price: 9.28,
    image: "/assets/cart_items/SpringMix-GrandeRonde_400x.webp",
    category: "new-arrivals",
    description: "Spring mix grande ronde that captures the freshness of the season.",
    inStock: true,
  },
  {
    _id: "p007",
    name: "Sweet Valentine",
    price: 6.24,
    image: "/assets/cart_items/WildMix-GrandeRonde_400x.webp",
    category: "new-arrivals",
    description: "Wild mix grande ronde — sweet, romantic, and perfect for your Valentine.",
    inStock: true,
  },
  {
    _id: "p008",
    name: "Erotic Mix",
    price: 43.67,
    image: "/assets/cart_items/Erotic-Mix_400x.webp",
    category: "new-arrivals",
    description: "A bold and passionate arrangement for those special intimate moments.",
    inStock: true,
  },

  // ── HOT SALES ─────────────────────────────────────────
  {
    _id: "p009",
    name: "Petite Heart",
    price: 37.24,
    image: "/assets/cart_items/Petite_Heart_400x.webp",
    category: "hot-sales",
    description: "A heart-shaped petite arrangement — say it all without words.",
    inStock: true,
  },
  {
    _id: "p010",
    name: "Classic Bunch",
    price: 10.23,
    image: "/assets/cart_items/Roses-Bunch_400x.webp",
    category: "hot-sales",
    description: "A timeless classic rose bunch — never goes out of style.",
    inStock: true,
  },
  {
    _id: "p011",
    name: "Classic Heart",
    price: 15.24,
    image: "/assets/cart_items/Roses-Gypsos_400x.webp",
    category: "hot-sales",
    description: "Roses and gypsophila in a classic heart — romance at its finest.",
    inStock: true,
  },
  {
    _id: "p012",
    name: "Blush Mix",
    price: 9.28,
    image: "/assets/cart_items/Classic-Bunch_400x.webp",
    category: "hot-sales",
    description: "A soft blush mix bunch — delicate, beautiful, and affordable.",
    inStock: true,
  },
]

// Helper to get products by category
export const getByCategory = (category) =>
  products.filter((p) => p.category === category)

export const getById = (id) => products.find((p) => p._id === id)
