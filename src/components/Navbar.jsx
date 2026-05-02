import React, { useState, useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  FiSearch, 
  FiHeart, 
  FiShoppingCart, 
  FiUser, 
  FiShoppingBag, 
  FiXCircle, 
  FiStar, 
  FiLogOut 
} from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import { DataContext } from '../context/DataContext';
import './Navbar.css';

function Navbar() {
  const { cart, wishlist } = useContext(CartContext);
  const { token, setToken } = useContext(DataContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">Exclusive</Link>
        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          {!token && <li><NavLink to="/signup">Sign Up</NavLink></li>}
        </ul>
        <div className="nav-icons">
          <div className="search-bar">
            <input type="text" placeholder="What are you looking for?" />
            <FiSearch size={20} />
          </div>
          <Link to="/wishlist" className="icon-link">
            <FiHeart size={24} />
            {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
          </Link>
          <div className="cart-container">
            <Link to="/cart" className="icon-link">
              <FiShoppingCart size={24} />
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </Link>
          </div>
          
          <div className="user-menu-container">
            <button 
              className={`user-icon-btn ${isDropdownOpen ? 'active' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FiUser size={24} />
            </button>

            {isDropdownOpen && (
              <div className="user-dropdown">
                {token ? (
                  <>
                    <Link to="/account" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <FiUser size={20} />
                      <span>Manage My Account</span>
                    </Link>
                    <Link to="/orders" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <FiShoppingBag size={20} />
                      <span>My Order</span>
                    </Link>
                    <Link to="/cancellations" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <FiXCircle size={20} />
                      <span>My Cancellations</span>
                    </Link>
                    <Link to="/reviews" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <FiStar size={20} />
                      <span>My Reviews</span>
                    </Link>
                    <button className="dropdown-item logout-btn" onClick={handleLogout}>
                      <FiLogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <FiUser size={20} />
                      <span>Login</span>
                    </Link>
                    <Link to="/signup" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <FiUser size={20} />
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

