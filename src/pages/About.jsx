import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { CiShop, CiDollar, CiBag1, CiMoneyBill } from "react-icons/ci";
import { FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { getMembers, BASE_URL } from '../services';

import 'swiper/css';
import 'swiper/css/pagination';
import './About.css';

function About() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    getMembers().then(data => {
      if (data && data.length > 0) {
        setTeam(data);
      } else {
        // Fallback to static data if API is empty or fails
        setTeam([
          { name: 'Tom Cruise', role: 'Founder & Chairman', image: '/images/753380720455799986790597879f972580665d56.png' },
          { name: 'Emma Watson', role: 'Managing Director', image: '/images/0890659616335198031d2799307d80509a2709e1.png' },
          { name: 'Will Smith', role: 'Product Designer', image: '/images/936087d10e6d6342618037c7849615a4e5088277.png' }
        ]);
      }
    });
  }, []);

  const stats = [
    { icon: <CiShop />, value: '10.5k', label: 'Sellers active our site',},
    { icon: <CiDollar />, value: '33k', label: 'Monthly Product Sale',},
    { icon: <CiBag1 />, value: '45.5k', label: 'Customer active in our site',},
    { icon: <CiMoneyBill />, value: '25k', label: 'Anual gross sale in our site'},
  ];

  const features = [
    {
      icon: <TbTruckDelivery />,
      title: 'FREE AND FAST DELIVERY',
      desc: 'Free delivery for all orders over $140',
    },
    {
      icon: <RiCustomerService2Line />,
      title: '24/7 CUSTOMER SERVICE',
      desc: 'Friendly 24/7 customer support',
    },
    {
      icon: <AiOutlineCheckCircle />,
      title: 'MONEY BACK GUARANTEE',
      desc: 'We reurn money within 30 days',
    },
  ];

  return (
    <div className="about-page">
      <div className="container section-padding">
        
        {/* Section 1: Our Story */}
        <div className="about-story-section">
          <div className="story-content">
            <h1 className="story-title">Our Story</h1>
            <p>
              Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.
            </p>
            <p>
              Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assortment in categories ranging from consumer.
            </p>
          </div>
          <div className="story-image">
            <img src="/public/images/fcc89aaa7b85f8c1dcce81e71e2eb178be13bd4d.jpg" alt="Our Story" />
          </div>
        </div>

        {/* Section 2: Stats */}
        <div className="about-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card ${stat.highlighted ? 'highlighted' : ''}`}>
              <div className="stat-icon-outer">
                <div className="stat-icon-inner">
                  {stat.icon}
                </div>
              </div>
              <h2 className="stat-value">{stat.value}</h2>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Section 3: Team Slider */}
        <div className="about-team-swiper-wrapper">
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="team-swiper"
          >
            {team.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="team-card">
                  <div className="team-image-wrapper">
                    <img 
                      src={member.image?.startsWith('http') ? member.image : BASE_URL + member.image} 
                      alt={member.name} 
                    />
                  </div>
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                    <div className="team-social">
                      <FiTwitter />
                      <FiInstagram />
                      <FiLinkedin />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Section 4: Features */}
        <div className="about-features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon-outer">
                <div className="feature-icon-inner">
                  {feature.icon}
                </div>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default About;



