import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import Card from '../components/Card';
import { getProduct } from '../services';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useContext(CartContext);
  const [justForYouItems, setJustForYouItems] = useState([]);

  useEffect(() => {
    getProduct().then(data => {
      setJustForYouItems(data.slice(0, 4));
    });
  }, []);

  const removeFromWishlist = (id) => {
    const product = wishlist.find(item => item.id === id);
    if (product) toggleWishlist(product);
  };

  return (
    <div className="wishlist-page container section-padding">
      {/* Wishlist Header */}
      <div className="wishlist-header">
        <h2 className="section-title">Wishlist ({wishlist.length})</h2>
        <button className="move-to-bag-btn">Move All To Bag</button>
      </div>

      {/* Wishlist Grid */}
      <div className="products-grid wishlist-grid">
        {wishlist.map(item => (
          <Card 
            key={item.id} 
            product={item} 
            type="wishlist" 
            showRating={false}
            onActionClick={removeFromWishlist}
          />
        ))}
      </div>

      {/* Just For You Section */}
      <div className="just-for-you-section">
        <div className="wishlist-header">
          <div className="section-tag-wrapper">
            <div className="red-box"></div>
            <h2 className="section-title">Just For You</h2>
          </div>
          <button className="see-all-btn">See All</button>
        </div>

        <div className="products-grid">
          {justForYouItems.length > 0 ? (
            justForYouItems.map(item => (
              <Card 
                key={item.id} 
                product={item} 
                type="just-for-you"
              />
            ))
          ) : (
            <p>Loading items...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
