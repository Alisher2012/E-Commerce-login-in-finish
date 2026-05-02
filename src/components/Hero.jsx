import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaApple, FaArrowRight } from 'react-icons/fa';
import './Hero.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination } from 'swiper/modules';

import { getCategory } from '../services';

function Hero() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategory().then((data) => {
      if (data) setCategories(data);
    });
  }, []);

  return (
    <div className="container">
      <section className="hero">
        <aside className="sidebar">
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                {/* <Link to={`/category/${category.id}`}> */}
                  {category.image && <img src={category.image} alt={category.title} className="category-icon" />}
                  <span>{category.title}</span>
                {/* </Link> */}
              </li>
            ))}
          </ul>
        </aside>

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="hero-swiper"
        >
          <SwiperSlide>
            <div className="hero-banner">
              <div className="hero-content">
                <div className="hero-brand">
                  <FaApple size={40} color="white" />
                  <span>iPhone 14 Series</span>
                </div>
                <h1>Up to 10% off Voucher</h1>
                <Link to="/shop" className="hero-link">
                  Shop Now <FaArrowRight className="hero-link-arrow" />
                </Link>
              </div>
              <div className="hero-image">
                <img src="/images/dc40ba897215f42e5883a64157f0aa3a4d1a866a.jpg" alt="iPhone 14" />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="hero-banner">
              <div className="hero-content">
                <div className="hero-brand">
                  <FaApple size={40} color="white" />
                  <span>iPhone 15 Series</span>
                </div>
                <h1>Latest Gadgets for You</h1>
                <Link to="" className="hero-link">
                  Shop Now <FaArrowRight className="hero-link-arrow" />
                </Link>
              </div>
              <div className="hero-image">
                <img src="/images/dc40ba897215f42e5883a64157f0aa3a4d1a866a.jpg" alt="iPhone 15" />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="hero-banner">
              <div className="hero-content">
                <div className="hero-brand">
                  <FaApple size={40} color="white" />
                  <span>MacBook Pro M3</span>
                </div>
                <h1>Unbelievable Performance</h1>
                <Link to="/shop" className="hero-link">
                  Shop Now <FaArrowRight className="hero-link-arrow" />
                </Link>
              </div>
              <div className="hero-image">
                <img src="/images/dc40ba897215f42e5883a64157f0aa3a4d1a866a.jpg" alt="MacBook" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
}

export default Hero;
