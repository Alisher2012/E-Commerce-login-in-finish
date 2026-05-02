import React from 'react';
import { FiPhone, FiMail } from 'react-icons/fi';
import './Contact.css';

function Contact() {
  return (
    <div className="container contact-page section-padding">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <span className="breadcrumb-path">Home</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Contact</span>
      </div>

      <div className="contact-content">
        {/* Left Sidebar: Contact Info */}
        <div className="contact-info-card">
          <div className="contact-info-section">
            <div className="contact-info-header">
              <div className="icon-wrapper">
                <FiPhone />
              </div>
              <h3>Call To Us</h3>
            </div>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +8801611112222</p>
          </div>

          <hr className="divider" />

          <div className="contact-info-section">
            <div className="contact-info-header">
              <div className="icon-wrapper">
                <FiMail />
              </div>
              <h3>Write To US</h3>
            </div>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Emails: customer@exclusive.com</p>
            <p>Emails: support@exclusive.com</p>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div className="contact-form-card">
          <form className="contact-form">
            <div className="form-row">
              <div className="input-group">
                <input type="text" placeholder="Your Name" required />
                <span className="required-star">*</span>
              </div>
              <div className="input-group">
                <input type="email" placeholder="Your Email" required />
                <span className="required-star">*</span>
              </div>
              <div className="input-group">
                <input type="tel" placeholder="Your Phone" required />
                <span className="required-star">*</span>
              </div>
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="8"></textarea>
            </div>
            <div className="form-footer">
              <button type="submit" className="submit-btn">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;

