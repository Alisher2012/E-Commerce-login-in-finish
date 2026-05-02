import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaRegHeart } from 'react-icons/fa';
import { FiTruck, FiRotateCcw } from 'react-icons/fi';
import { getProductById, getProduct, BASE_URL } from '../services';
import Card from '../components/Card';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    getProductById(id).then(data => {
      setProduct(data);
      if (data && data.pictures && data.pictures.length > 0) {
        setMainImage(BASE_URL + data.pictures[0]);
      }
      setLoading(false);
      
      // Fetch related products (same category)
      if (data && data.category) {
        getProduct().then(allProducts => {
          const related = allProducts.filter(p => p.category?.id === data.category.id && p.id !== data.id);
          setRelatedProducts(related.slice(0, 4));
        });
      }
    });
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="container section-padding">Loading...</div>;
  if (!product) return <div className="container section-padding">Product not found.</div>;

  return (
    <div className="product-details-page container section-padding">
      <div className="breadcrumbs">
        <span className="breadcrumb-path">Account / {product.category?.title} / </span>
        <span className="breadcrumb-current">{product.title}</span>
      </div>

      <div className="product-main-content">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="thumbnail-list">
            {product.pictures?.map((pic, index) => (
              <div 
                key={index} 
                className={`thumbnail-item ${mainImage === BASE_URL + pic ? 'active' : ''}`}
                onClick={() => setMainImage(BASE_URL + pic)}
              >
                <img src={BASE_URL + pic} alt={`${product.title} ${index}`} />
              </div>
            ))}
          </div>
          <div className="main-image-wrapper">
            <img src={mainImage} alt={product.title} />
          </div>
        </div>

        {/* Info */}
        <div className="product-info-details">
          <h1 className="product-name">{product.title}</h1>
          
          <div className="product-rating-row">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar
                  key={i}
                  className={i <= product.stars ? "star filled" : "star"}
                />
              ))}
            </div>
            <span className="review-count">({product.review_quantity} Reviews)</span>
            <span className="divider">|</span>
            <span className="stock-status">In Stock</span>
          </div>

          <div className="product-price-large">${product.discount_price || product.price}</div>

          <p className="product-description">
            {product.description || "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive."}
          </p>

          <hr className="divider-line" />

          <div className="product-options">
            <div className="option-row">
              <span className="option-label">Colours:</span>
              <div className="color-dots">
                <span className="color-dot blue "></span>
                <span className="color-dot red"></span>
              </div>
            </div>

            <div className="option-row">
              <span className="option-label">Size:</span>
              <div className="size-btns">
                <button className="size-btn">XS</button>
                <button className="size-btn">S</button>
                <button className="size-btn ">M</button>
                <button className="size-btn">L</button>
                <button className="size-btn">XL</button>
              </div>
            </div>
          </div>

          <div className="purchase-actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="btn-primary buy-now-btn">Buy Now</button>
            <button className="wishlist-action-btn"><FaRegHeart /></button>
          </div>

          <div className="delivery-info-card">
            <div className="delivery-item">
              <FiTruck className="delivery-icon" />
              <div className="delivery-text">
                <h4>Free Delivery</h4>
                <p>Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <hr />
            <div className="delivery-item">
              <FiRotateCcw className="delivery-icon" />
              <div className="delivery-text">
                <h4>Return Delivery</h4>
                <p>Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items Section */}
      {relatedProducts.length > 0 && (
        <div className="related-items-section section-padding">
          <div className="section-header-red">
            <div className="red-bar"></div>
            <span>Related Item</span>
          </div>
          <div className="related-grid">
            {relatedProducts.map(item => (
              <Card key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
