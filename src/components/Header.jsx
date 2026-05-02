import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Header.css';

function Header() {
  return (
    <header className="main-header">
      <div className="top-header">
        <div className="container top-header-content">
          <div className="promo-message">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! 
            <Link to="/shop" className="shop-now-link">ShopNow</Link>
          </div>
          <div className="lang-selector">
            English <span className="chevron-down"></span>
          </div>
        </div>
      </div>

      <Navbar />
    </header>
  );
}

export default Header;
