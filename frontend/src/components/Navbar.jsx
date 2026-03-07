import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount } from "../features/cart/cartSlice";
import { selectUser, logout } from "../features/auth/authSlice";
import toast from "react-hot-toast";

function Navbar() {
  const cartCount = useSelector(selectCartCount); // reads cart count from Redux
  const user = useSelector(selectUser); // reads logged-in user from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleLogout = () => {
    dispatch(logout()); // clears user & token from Redux + localStorage
    toast.success("Logged out successfully!");
    navigate("/");
  };
  const [menuOpen, setMenuOpen] = useState(false) 
  return (
    <>
      {/* ── Top Info Bar ──────────────────────────── */}
      <div className="top-bar">
        <div className="top-bar-inner">
          <p>Express Delivery or refund guaranteed. 🌸</p>
          {user ? (
            <div className="user-greeting">
              <span>Hi, {user.name}! 👋</span>
              <Link to="/my-orders">My Orders</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login">LOGIN / REGISTER</Link>
          )}
        </div>
      </div>

      {/* ── Main Navbar ───────────────────────────── */}
      <nav className="navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src="/assets/logo.png" alt="Dandelions" />
          </Link>
          {/* Nav Links */}
          
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
          </button>
          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <a href="/#contact">Contact</a>
            </li>
          </ul>
          {/* Cart Icon with badge */}
          <div className="nav-right">
            <Link to="/cart" className="cart-btn text-size-md">
              🛒Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
