import React, { useState, useEffect } from 'react';
import { getProduct } from '../services';
import Card from '../components/Card';
import './Home.css'; // Reuse home styles for grid

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct().then(data => {
      if (data) setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="shop-page container section-padding">
      <h2 className="section-title">All Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="related-grid" style={{ marginTop: '40px' }}>
          {products.map(product => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
