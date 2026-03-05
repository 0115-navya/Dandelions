# 🌸 Dandelions — React + Redux + Node.js Conversion Guide

## What's been built

Your original HTML/CSS/JS site has been converted into a full-stack React application. Here's everything included:

---

## 📁 Project Structure

```
dandelions/
├── frontend/                    ← React app (Vite)
│   ├── src/
│   │   ├── app/
│   │   │   └── store.js         ← Redux store config
│   │   ├── features/
│   │   │   ├── cart/
│   │   │   │   └── cartSlice.js ← Add/remove/qty/clear cart
│   │   │   ├── auth/
│   │   │   │   └── authSlice.js ← Login/register/logout
│   │   │   └── orders/
│   │   │       └── orderSlice.js← Place order / fetch orders
│   │   ├── components/
│   │   │   ├── Navbar.jsx       ← Live cart count badge
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx  ← Reusable card with Add to Cart
│   │   │   └── ProtectedRoute.jsx ← Guards checkout/orders
│   │   ├── pages/
│   │   │   ├── Home.jsx         ← Your full index.html converted
│   │   │   ├── Shop.jsx         ← Filter + sort all products
│   │   │   ├── ProductDetail.jsx← Individual product page
│   │   │   ├── Cart.jsx         ← Cart with qty controls
│   │   │   ├── Checkout.jsx     ← Address + payment + order
│   │   │   ├── Login.jsx        ← JWT login form
│   │   │   ├── Register.jsx     ← With your original validation!
│   │   │   ├── OrderSuccess.jsx ← After placing order
│   │   │   ├── MyOrders.jsx     ← Order history
│   │   │   └── AboutUs.jsx
│   │   ├── data/
│   │   │   └── products.js      ← All 12 products from your HTML
│   │   ├── App.jsx              ← All routes defined here
│   │   ├── main.jsx             ← Redux Provider wraps app
│   │   └── index.css            ← Your styles.css converted + new
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
└── backend/                     ← Node.js + Express + MongoDB
    ├── models/
    │   ├── User.js              ← bcrypt password hashing
    │   └── Order.js             ← Full order schema
    ├── routes/
    │   ├── authRoutes.js        ← Register, Login, /me
    │   ├── orderRoutes.js       ← Place order, My orders
    │   └── productRoutes.js     ← Ready for MongoDB products
    ├── middleware/
    │   └── authMiddleware.js    ← JWT protect middleware
    ├── server.js                ← Express app entry point
    ├── package.json
    └── .env.example             ← Copy this to .env
```

---

## 🚀 Step-by-Step Setup

### Step 1 — Copy assets from your original project

Your images are in `assets/` folder. Copy them to:
```
frontend/public/assets/
```

This means the path `/assets/logo.png` will work in React (Vite serves the `public/` folder).

```bash
# From your original project folder:
cp -r assets/ dandelions/frontend/public/assets/
```

---

### Step 2 — Set up the Frontend

```bash
cd dandelions/frontend
npm install
npm run dev
```

Your app will open at `http://localhost:5173`

> **Note:** Cart and Shop will work immediately! Login/Register/Checkout needs the backend running.

---

### Step 3 — Set up MongoDB (free)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) → Create free account
2. Create a free cluster
3. Click **Connect** → **Drivers** → copy the connection string
4. It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`

---

### Step 4 — Set up the Backend

```bash
cd dandelions/backend

# Copy the .env template
cp .env.example .env

# Edit .env with your real values:
# MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster0.xxxxx.mongodb.net/dandelions
# JWT_SECRET=any_random_long_string_here

npm install
npm run dev
```

Server starts at `http://localhost:5000`

---

### Step 5 — Test the full flow

1. Open `http://localhost:5173`
2. Browse products → click **Add to Cart** → see badge update in navbar ✅
3. Go to Cart → adjust quantities → proceed to checkout
4. Register a new account → fills in your name automatically
5. Fill in delivery address → Place Order
6. See the Order Success page with your order details
7. Check My Orders in the navbar

---

## 🧠 Key Concepts You Learned

### Redux Flow (how state moves)

```
User clicks "Add to Cart"
    ↓
ProductCard.jsx calls dispatch(addToCart(product))
    ↓
cartSlice.js reducer runs, adds item to state.cart.items
    ↓
localStorage.setItem saves cart (persists on refresh)
    ↓
Navbar.jsx useSelector(selectCartCount) auto-updates badge
    ↓
Cart.jsx useSelector(selectCartItems) shows all items
```

### Auth Flow

```
User fills login form → dispatch(loginUser({email, password}))
    ↓
authSlice.js makes API call to POST /api/auth/login
    ↓
Backend checks password with bcrypt.compare()
    ↓
Backend returns { user, token }
    ↓
Token saved in localStorage + Redux state
    ↓
ProtectedRoute allows access to /checkout
    ↓
Every API call includes "Authorization: Bearer <token>"
```

### Order Flow

```
User clicks "Place Order" in Checkout.jsx
    ↓
dispatch(placeOrder({ items, address, payment, total }))
    ↓
orderSlice.js sends POST /api/orders with JWT token
    ↓
Backend verifies token → creates Order in MongoDB
    ↓
Order returned → cart cleared → redirect to /order-success
    ↓
User can see order in /my-orders
```

---

## 📚 What's Different From Your Original HTML

| Original | New React Version |
|----------|-------------------|
| `<a href="login.html">` | `<Link to="/login">` |
| jQuery `$(document).ready()` | `useEffect()` hook |
| `document.getElementById()` | `useState()` + controlled inputs |
| All products in HTML | `data/products.js` array |
| No real cart | Redux cart with localStorage |
| Login just validates password | Real JWT auth with MongoDB |
| "Buy Now" links to CodePen | Proper cart → checkout → order |

---

## 🔜 Next Steps You Can Add

1. **Admin panel** — manage products, view all orders
2. **Search bar** — filter products by name
3. **Razorpay/Stripe payment** — real online payments
4. **Email confirmation** — send order email via Nodemailer
5. **Product reviews** — star ratings
6. **Move products to MongoDB** — add Product model, seed script

---

## ❓ Common Errors & Fixes

**"Cannot read properties of undefined"**
→ Check that your Redux selector name matches exactly

**CORS error in browser**
→ Make sure backend `.env` has `FRONTEND_URL=http://localhost:5173`

**"Not authorized, no token"**
→ You're trying to access a protected route without being logged in

**Images not showing**
→ Make sure you copied `assets/` folder to `frontend/public/assets/`
