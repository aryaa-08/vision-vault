import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './UploadSubmit.css';

const UploadSubmit = ({ user }) => {
  const location = useLocation();
  const { projectTitle, fileUrl } = location.state || {};

  return (
    <div className="success-body">
      <header className="success-header">
        <div className="success-nav-links">
          <span className="success-logo">Vision Vault</span>
          <Link to="/home">Home</Link>
          <a href="#">Explore</a>
          <Link to="/upload">Upload</Link>
          <a href="#">Top</a>
          <a href="#">Community</a>
        </div>
        <div className="success-profile">
          <div className="success-profile-circle"></div>
          <div className="success-profile-info">
            <strong>{user?.username || 'User'}</strong>
            <span>Your personal account</span>
          </div>
        </div>
      </header>

      <div className="success-message">
        Upload<br />
        Successful!!
        <p style={{ fontSize: '18px', marginTop: '20px' }}>Your project titled "{projectTitle}" has been successfully uploaded!</p>
        <p style={{ fontSize: '18px' }}>Here’s the link to view your uploaded file:</p>
        <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#4a00e0', fontSize: '16px' }}>{fileUrl}</a>
      </div>
    </div>
  );
};

export default UploadSubmit;
