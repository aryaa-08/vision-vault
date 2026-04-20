import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/signup', { username, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Error registering user');
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
          <h2>Create Your Account</h2>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <form onSubmit={handleSignup}>
            <input 
              type="text" 
              name="username" 
              placeholder="Full Name" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />

            <label className="auth-checkbox-row" style={{justifyContent: 'flex-start'}}>
              <input type="checkbox" name="terms" required /> I agree to the Terms and Conditions
            </label>

            <button type="submit">Sign Up</button>

            <p className="auth-link-text">Already have an account? <Link to="/login">Sign In</Link></p>

            <div className="auth-separator"><span>Or</span></div>

            <button type="button" className="auth-social-btn google">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" /> Sign up with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
