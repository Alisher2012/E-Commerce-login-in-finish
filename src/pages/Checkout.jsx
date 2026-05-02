import React from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { BASE_URL } from '../services';
import './Checkout.css';

const Checkout = () => {
  const billingFields = [
    { id: 'first_name', label: 'First Name', type: 'text', required: true },
    { id: 'company_name', label: 'Company Name', type: 'text', required: false },
    { id: 'street_address', label: 'Street Address', type: 'text', required: true },
    { id: 'apartment', label: 'Apartment, floor, etc. (optional)', type: 'text', required: false },
    { id: 'city', label: 'Town/City', type: 'text', required: true },
    { id: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { id: 'email', label: 'Email Address', type: 'email', required: true },
  ];

  const orderItems = []; 

  return (
    <div className="checkout-page container section-padding">
      <div className="breadcrumbs">
        <span className="breadcrumb-path">Account / My Account / Product / View Cart / </span>
        <span className="breadcrumb-current">Checkout</span>
      </div>

      <h1 className="checkout-title">Billing Details</h1>

      <div className="checkout-content">
        <div className="billing-details">
          <form className="checkout-form">
            {billingFields.map((field) => (
              <div key={field.id} className="form-group">
                <label>{field.label}{field.required && <span className="required">*</span>}</label>
                <input type={field.type} />
              </div>
            ))}
            <div className="checkbox-group">
              <input type="checkbox" id="save-info" />
              <label htmlFor="save-info">Save this information for faster check-out next time</label>
            </div>
          </form>
        </div>

        <div className="order-summary-card">
          <div className="order-items">
            {orderItems.map(item => (
              <div key={item.id} className="summary-item">
                <div className="item-left">
                  <img src={item.image} alt={item.name} />
                  <span>{item.name}</span>
                </div>
                <span className="item-price">${item.price}</span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>$1750</span>
            </div>
            <hr />
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="summary-row grand-total">
              <span>Total:</span>
              <span>$1750</span>
            </div>
          </div>

          <div className="payment-options">
            <div className="payment-option">
              <div className="option-label">
                <input type="radio" name="payment" id="bank" />
                <label htmlFor="bank">Bank</label>
              </div>
              <div className="bank-icons">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" />
              </div>
            </div>
            <div className="payment-option">
              <div className="option-label">
                <input type="radio" name="payment" id="cash" defaultChecked />
                <label htmlFor="cash">Cash on delivery</label>
              </div>
            </div>
          </div>

          <div className="coupon-section checkout-coupon">
            <input type="text" placeholder="Coupon Code" />
            <button className="btn-primary">Apply Coupon</button>
          </div>

          <button className="btn-primary place-order-btn">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
