import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { LuGamepad } from "react-icons/lu";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import Hero from '../components/Hero';
import Card from '../components/Card';
import { getProduct, getCategory } from '../services';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProduct().then((data) => {
      if (data) setProducts(data);
    });
    getCategory().then((data) => {
      if (data) setCategories(data);
    });
  }, []);

  return (
    <div className="home-page">
      <Hero />

      {/* Flash Sales Section */}
      <section className="section-padding container">
        <span className="text-overline">Today’s</span>
        <div className="flash-sales-header">
          <h2 className="section-title">Flash Sales</h2>
          <div className="swiper-nav-buttons">
            <div className="swiper-button-prev-flash custom-nav-btn"><FaArrowLeft /></div>
            <div className="swiper-button-next-flash custom-nav-btn"><FaArrowRight /></div>
          </div>
        </div>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            prevEl: '.swiper-button-prev-flash',
            nextEl: '.swiper-button-next-flash',
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          modules={[Navigation]}
          className="flash-sales-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Card product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="view-all-container">
          <button className="btn-primary">View All Products</button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding container">
        <span className="text-overline">Categories</span>
        <div className="category-header">
          <h2 className="section-title">Browse By Category</h2>
          <div className="swiper-nav-buttons">
            <div className="swiper-button-prev-cat custom-nav-btn"><FaArrowLeft /></div>
            <div className="swiper-button-next-cat custom-nav-btn"><FaArrowRight /></div>
          </div>
        </div>

        <Swiper
          spaceBetween={30}
          slidesPerView={2}
          navigation={{
            prevEl: '.swiper-button-prev-cat',
            nextEl: '.swiper-button-next-cat',
          }}
          breakpoints={{
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          modules={[Navigation]}
          className="category-swiper"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="category-card">
                {category.image ? (
                  <img src={category.image} alt={category.title} style={{ width: '40px', height: '40px', objectFit: 'contain', marginBottom: '10px' }} />
                ) : (
                  <div className="category-placeholder">📦</div>
                )}
                <span>{category.title}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Best Selling Section */}
      <section className="section-padding container">
        <span className="text-overline">This Month</span>
        <div className="best-selling-header">
          <h2 className="section-title">Best Selling Products</h2>
          <div className="swiper-nav-buttons">
            <div className="swiper-button-prev-best custom-nav-btn"><FaArrowLeft /></div>
            <div className="swiper-button-next-best custom-nav-btn"><FaArrowRight /></div>
          </div>
        </div>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            prevEl: '.swiper-button-prev-best',
            nextEl: '.swiper-button-next-best',
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          modules={[Navigation]}
          className="best-selling-swiper"
        >
          {products.slice(0, 4).map((product) => (
            <SwiperSlide key={product.id}>
              <Card product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Promo Banner */}
      <section className="section-padding container">
        <div className="promo-banner">
          <div className="promo-content">
            <span className="promo-category">Categories</span>
            <h2 className="promo-title">Enhance Your Music Experience</h2>
            <button className="promo-btn">Buy Now!</button>
          </div>
          <img src="/images/3cc943ca7e210f637fc0504b7d93cd207df744c2.png" alt="Speakers" className="promo-image" />
        </div>
      </section>

      {/* New Arrival */}
      <section className="section-padding container">
        <span className="text-overline">Featured</span>
        <h2 className="section-title">New Arrival</h2>
        <div className="new-arrival-grid">
          <div className="arrival-large">
            <img src="/images/1c360f790c1817d3afa266b3c9f8c81ff0ed4428.png" alt="PS5" className="arrival-img-large" />
            <div className="arrival-content">
              <h3>PlayStation 5</h3>
              <p>Black and White version of the PS5 coming out on sale.</p>
              <Link to="/shop">Shop Now</Link>
            </div>
          </div>
          <div className="arrival-medium">
             <img src="/images/455c8d6408463f7e8f57dd3048a2444dbfa0cb90.jpg" alt="Women" className="arrival-img-full" />
             <div className="arrival-content">
              <h3>Women’s Collections</h3>
              <p>Featured woman collections that give you another vibe.</p>
              <Link to="/shop">Shop Now</Link>
            </div>
          </div>
          <div className="arrival-small-1">
             <img src="/images/Frame 707.png" alt="Speakers" className="arrival-img-small" />
             <div className="arrival-content">
              <h3>Speakers</h3>
              <p>Amazon wireless speakers</p>
              <Link to="/shop">Shop Now</Link>
            </div>
          </div>
          <div className="arrival-small-2">
             <img src="/images/Frame 706.png" alt="Perfume" className="arrival-img-small" />
             <div className="arrival-content">
              <h3>Perfume</h3>
              <p>GUCCI INTENSE OUD EDP</p>
              <Link to="/shop">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
