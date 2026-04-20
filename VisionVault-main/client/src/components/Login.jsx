import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.data.user) {
        setUser(response.data.user);
        navigate('/home');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      {/* Left Panel */}
      <div className="auth-left-panel">
        <h1>Showcase.<br />Collaborate.<br />Integrate</h1>
        <div className="auth-dots">
          <span></span><span className="active"></span><span></span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right-panel">
        <div className="auth-form-box">
          <h2>Welcome Back</h2>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />

            <div className="auth-checkbox-row">
              <label><input type="checkbox" /> Remember me</label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit">Sign In</button>

            <p className="auth-link-text">Don't have an account? <Link to="/signup">Sign Up</Link></p>

            <div className="auth-separator"><span>Or</span></div>

            <button type="button" className="auth-social-btn google">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" /> Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
