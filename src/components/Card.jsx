// import React from 'react';
// import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
// import './Card.css';

// const Card = ({ product }) => {
//   const {
//     title,
//     price,
//     discount_price,
//     discount_percent,
//     stars,
//     review_quantity,
//     pictures
//   } = product;

//   const baseUrl = "https://ecommercev01.pythonanywhere.com";
//   const mainImage = pictures && pictures.length > 0 ? `${baseUrl}${pictures[0]}` : '';

//   const renderStars = (rating) => {
//     const starsArray = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= rating) {
//         starsArray.push(<FaStar key={i} className="star-icon filled" />);
//       } else if (i - 0.5 <= rating) {
//         starsArray.push(<FaStarHalfAlt key={i} className="star-icon half" />);
//       } else {
//         starsArray.push(<FaRegStar key={i} className="star-icon" />);
//       }
//     }
//     return starsArray;
//   };

//   return (
//     <div className="product-card">
//       <div className="product-img-wrapper">
//         {discount_percent && <span className="discount-badge">-{discount_percent}%</span>}
//         <img src={mainImage} alt={title} className="product-img" />
//         <div className="add-to-cart">Add To Cart</div>
//       </div>
//       <div className="product-info">
//         <h3 title={title}>{title}</h3>
//         <div className="price-wrapper">
//           <span className="price">${discount_price}</span>
//           {discount_price !== price && <span className="old-price">${price}</span>}
//         </div>
//         <div className="rating">
//           <div className="stars">{renderStars(stars)}</div>
//           <span className="rating-count">({review_quantity})</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;



import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegTrashAlt, FaRegEye, FaRegHeart, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { BASE_URL } from '../services';
import './Card.css';

function Card({ product, showRating = true, type = 'standard', onActionClick }) {
  const { addToCart, wishlist, toggleWishlist } = useContext(CartContext);

  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const image = product.pictures?.[0]
    ? (product.pictures[0].startsWith('http') ? product.pictures[0] : BASE_URL + product.pictures[0])
    : '';

  return (
    <div className="product-card">
      <div className="product-img-wrapper">
        {product.discount_percent && (
          <span className="discount-badge">
            -{product.discount_percent}%
          </span>
        )}
        {product.is_new && (
          <span className="new-badge">NEW</span>
        )}

        <div className="card-actions">
          {type === 'wishlist' ? (
            <button className="action-btn" onClick={() => onActionClick && onActionClick(product.id)}>
              <FaRegTrashAlt />
            </button>
          ) : (
            <>
              <button className={`action-btn wishlist-btn ${isInWishlist ? 'active' : ''}`} onClick={handleWishlistClick}>
                {isInWishlist ? <FaHeart color="#db4444" /> : <FaRegHeart />}
              </button>
              <Link to={`/product/${product.id}`} className="action-btn">
                <FaRegEye />
              </Link>
            </>
          )}
        </div>

        <Link to={`/product/${product.id}`} className="product-img-link">
          <img src={image} alt={product.title} className="product-img" />
        </Link>

        <div className="add-to-cart-bar" onClick={() => addToCart(product)}>
          <FaShoppingCart /> Add To Cart
        </div>
      </div>

      <div className="product-info">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-title">{product.title}</h3>
        </Link>

        <div className="price-wrapper">
          <span className="price">${product.discount_price || product.price}</span>
          {product.discount_price && product.discount_price !== product.price && (
            <span className="old-price">${product.price}</span>
          )}
        </div>

        {showRating && (
          <div className="rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar
                  key={i}
                  className={i <= (product.stars || 0) ? "star filled" : "star"}
                />
              ))}
            </div>
            <span className="rating-count">({product.review_quantity || 0})</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;