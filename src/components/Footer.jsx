import { Link } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>Exclusive</h3>
            <ul>
              <li>Subscribe</li>
              <li>Get 10% off your first order</li>
              <li className="footer-input-group">
                <input type="text" placeholder="Enter your email" />
                <FiSend size={20} />
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Support</h3>
            <ul>
              <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
              <li>exclusive@gmail.com</li>
              <li>+88015-88888-9999</li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Account</h3>
            <ul>
              <li><Link to="/account">My Account</Link></li>
              <li><Link to="/login">Login / Register</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/shop">Shop</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Quick Link</h3>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms Of Use</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Download App</h3>
            <ul>
              <li className="footer-app-label">Save $3 with App New User Only</li>
              <li className="footer-app-links">
                 <div className="qr-code">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://example.com" alt="QR" />
                 </div>
                 <div className="store-buttons">
                    <button className="store-btn">
                      <FaApple size={15} />
                      <span>App Store</span>
                    </button>
                    <button className="store-btn">
                      <FaGooglePlay size={15} />
                      <span>Google Play</span>
                    </button>
                 </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © Copyright Rimel 2022. All right reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
