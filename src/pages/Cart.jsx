import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import { BASE_URL } from '../services';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext);

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => {
      const price = item.discount_price || item.price;
      return acc + (price * item.quantity);
    }, 0);
  };

  return (
    <div className="cart-page container section-padding">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <span className="breadcrumb-path">Home</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Cart</span>
      </div>

      <div className="cart-table-wrapper">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => {
              const itemImage = item.pictures?.[0] 
                ? (item.pictures[0].startsWith('http') ? item.pictures[0] : BASE_URL + item.pictures[0])
                : '';
              const price = item.discount_price || item.price;

              return (
                <tr key={item.id} className="cart-item-row">
                  <td className="product-info-cell">
                    <div className="product-img-name">
                      <div className="product-image">
                        <img src={itemImage} alt={item.title} />
                        <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>×</button>
                      </div>
                      <span>{item.title}</span>
                    </div>
                  </td>
                  <td>${price}</td>
                  <td>
                    <div className="quantity-selector-cart">
                      <button onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </td>
                  <td>${price * item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="cart-actions">
        <Link to="/" className="btn-secondary">Return To Shop</Link>
        <button className="btn-secondary">Update Cart</button>
      </div>

      <div className="cart-bottom">
        <div className="coupon-section">
          <input type="text" placeholder="Coupon Code" />
          <button className="btn-primary">Apply Coupon</button>
        </div>

        <div className="cart-total-card">
          <h3>Cart Total</h3>
          <div className="total-row">
            <span>Subtotal:</span>
            <span>${calculateSubtotal()}</span>
          </div>
          <hr />
          <div className="total-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <hr />
          <div className="total-row grand-total">
            <span>Total:</span>
            <span>${calculateSubtotal()}</span>
          </div>
          <button className="btn-primary checkout-btn">Process to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
