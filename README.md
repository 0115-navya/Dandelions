# 🌼 Dandelions

A full-stack e-commerce platform for buying and selling flowers and plants — bringing nature to your doorstep.

🔗 **Live Demo:** [dandelions-mauve.vercel.app](https://dandelions-mauve.vercel.app/)

---

## 🚀 Features

- 🌸 **Product Listings** — Browse a wide collection of flowers and plants
- 🛒 **Shopping Cart** — Add items and manage your cart with ease
- 💳 **Checkout Flow** — Seamless order placement experience
- 👤 **User Authentication** — Register, log in, and manage your account
- 📦 **Order Management** — Track placed orders
- 🔍 **Search & Filter** — Find plants by category, name, or price

---

## 🛠️ Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React.js, CSS           |
| Backend   | Node.js, Express.js     |
| Database  | MongoDB                 |
| Deployment| Vercel (frontend), Render/Railway (backend) |

---

## 📁 Project Structure

```
Dandelions/
├── frontend/       # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
└── backend/        # Node/Express backend
    ├── models/
    ├── routes/
    ├── controllers/
    └── index.js
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/0115-navya/Dandelions.git
   cd Dandelions
   ```

2. **Setup the backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
   ```bash
   npm start
   ```

3. **Setup the frontend**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment

- **Frontend** deployed on [Vercel](https://vercel.com)
- **Backend** hosted on a cloud server (e.g., Render, Railway)

---

## 📬 Contact

Made with 🌻 by [Navya](https://github.com/0115-navya)
