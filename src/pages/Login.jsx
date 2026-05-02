import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { loginFunc } from '../services';
import { DataContext } from '../context/DataContext';

function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(DataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const result = await loginFunc(email, password);
      if (result && result.access) {
        localStorage.setItem('token', result.access);
        setToken(result.access);
        navigate('/');
      } else {
        setError(result?.detail || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred during login.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <img src="/images/75f394c0a1c7dc5b68a42239311e510f54d8cd59.jpg" alt="Shopping" />
      </div>
      <div className="auth-form-wrapper">
        <form className="auth-form" onSubmit={handleLogin}>
          <h1>Log in to Exclusive</h1>
          <p>Enter your details below</p>
          
          {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email or Phone Number" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="login-actions">
            <button type="submit" className="btn-primary login-btn">Log In</button>
            <Link to="#">Forget Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

