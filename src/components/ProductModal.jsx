import React from 'react';
import { useQuickView } from '../context/QuickViewContext';
import { FaTimes, FaStar, FaHeart, FaRegHeart, FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { BASE_URL } from '../services';
import './ProductModal.css';

const ProductModal = () => {
  const { selectedProduct, isModalOpen, closeQuickView } = useQuickView();
  const { addToCart, wishlist, toggleWishlist } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isModalOpen) {
      setQuantity(1);
    }
  }, [isModalOpen, selectedProduct]);

  if (!isModalOpen || !selectedProduct) return null;

  const isInWishlist = wishlist.some(item => item.id === selectedProduct.id);

  const image = selectedProduct.pictures?.[0]
    ? (selectedProduct.pictures[0].startsWith('http') ? selectedProduct.pictures[0] : BASE_URL + selectedProduct.pictures[0])
    : '';

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      closeQuickView();
    }
  };

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={closeQuickView}>
          <FaTimes />
        </button>

        <div className="modal-body">
          <div className="product-visuals">
            <div className="main-img-container">
              <img src={image} alt={selectedProduct.title} />
            </div>
          </div>

          <div className="product-details-content">
            <h2 className="modal-title">{selectedProduct.title}</h2>
            
            <div className="rating-row">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar
                    key={i}
                    className={i <= (selectedProduct.stars || 0) ? "star filled" : "star"}
                  />
                ))}
              </div>
              <span className="reviews">({selectedProduct.review_quantity || 0} Reviews)</span>
              <span className="stock-status">| In Stock</span>
            </div>

            <div className="price-display">
              ${selectedProduct.discount_price || selectedProduct.price}
            </div>

            <p className="description">
              {selectedProduct.description || "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive."}
            </p>

            <div className="divider"></div>

            <div className="action-row">
              <div className="quantity-selector">
                <button onClick={decrement}><FaMinus /></button>
                <span>{quantity}</span>
                <button onClick={increment}><FaPlus /></button>
              </div>

              <button className="buy-now-btn" onClick={() => addToCart(selectedProduct, quantity)}>
                Buy Now
              </button>

              <button 
                className={`wishlist-toggle ${isInWishlist ? 'active' : ''}`}
                onClick={() => toggleWishlist(selectedProduct)}
              >
                {isInWishlist ? <FaHeart color="#db4444" /> : <FaRegHeart />}
              </button>
            </div>

            <div className="delivery-info">
              <div className="info-item">
                <div className="icon">🚚</div>
                <div className="text">
                  <strong>Free Delivery</strong>
                  <p>Enter your postal code for Delivery Availability</p>
                </div>
              </div>
              <div className="info-item">
                <div className="icon">🔄</div>
                <div className="text">
                  <strong>Return Delivery</strong>
                  <p>Free 30 Days Delivery Returns. Details</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
