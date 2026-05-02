import React, { useState, useEffect, useContext } from 'react';
import './Account.css';
import { DataContext } from '../context/DataContext';
import { getUserInfo, updateUserInfo } from '../services';

const Account = () => {
  const { token } = useContext(DataContext);
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email_or_phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      getUserInfo(token).then((data) => {
        if (data) {
          setUserData({
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            email_or_phone: data.email_or_phone || '',
            address: data.address || ''
          });
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage('Please log in to update your profile.');
      return;
    }

    try {
      const result = await updateUserInfo(token, userData);
      if (result) {
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to update profile.');
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  if (loading) {
    return <div className="container section-padding">Loading...</div>;
  }

  if (!token) {
    return (
      <div className="container section-padding">
        <h2>Please log in to access your account settings.</h2>
      </div>
    );
  }

  return (
    <div className="account-page container section-padding">
      <div className="account-header">
        <div className="breadcrumbs">
          <span className="breadcrumb-path">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">My Account</span>
        </div>
        <div className="welcome-msg">
          Welcome! <span className="user-name">{userData.first_name} {userData.last_name}</span>
        </div>
      </div>

      <div className="account-content">
        {/* Left Sidebar */}
        <aside className="account-sidebar">
          <div className="sidebar-section">
            <h3>Manage My Account</h3>
            <ul>
              <li className="active">My Profile</li>
              <li>Address Book</li>
              <li>My Payment Options</li>
            </ul>
          </div>
          <div className="sidebar-section">
            <h3>My Orders</h3>
            <ul>
              <li>My Returns</li>
              <li>My Cancellations</li>
            </ul>
          </div>
          <div className="sidebar-section">
            <h3>My Wishlist</h3>
          </div>
        </aside>

        {/* Right Content */}
        <div className="profile-edit-card">
          <h2 className="profile-title">Edit Your Profile</h2>
          {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  name="first_name" 
                  value={userData.first_name} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="last_name" 
                  value={userData.last_name} 
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email_or_phone" 
                  value={userData.email_or_phone} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={userData.address} 
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="password-change-section">
              <h3>Password Changes</h3>
              <div className="form-group">
                <input type="password" placeholder="Current Password" />
              </div>
              <div className="form-group">
                <input type="password" placeholder="New Password" />
              </div>
              <div className="form-group">
                <input type="password" placeholder="Confirm New Password" />
              </div>
            </div>

            <div className="profile-form-footer">
              <button type="button" className="btn-text" onClick={() => window.location.reload()}>Cancel</button>
              <button type="submit" className="btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;

