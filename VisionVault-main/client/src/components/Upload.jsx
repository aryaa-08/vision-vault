import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Upload.css';

const Upload = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    domain: '',
    title: '',
    problem: '',
    idea: '',
    tech: '',
    type: '',
    desc: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('file', file);

    try {
      const response = await axios.post('/api/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Assuming response contains the uploaded file details
      navigate('/upload-success', { state: response.data });
    } catch (err) {
      console.error('Error uploading file', err);
      alert('Error uploading file. Are you logged in?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-body">
      <div className="upload-container">
        <h2>Project Submission - Vision Vault</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />

          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

          <label htmlFor="domain">Domain</label>
          <select id="domain" name="domain" value={formData.domain} onChange={handleChange} required>
            <option value="">--Select Domain--</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Web Development">Web Development</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Blockchain">Blockchain</option>
            <option value="IoT">IoT</option>
          </select>

          <label htmlFor="title">Project Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />

          <label htmlFor="problem">Problem Statement</label>
          <textarea id="problem" name="problem" rows="3" value={formData.problem} onChange={handleChange} required></textarea>

          <label htmlFor="idea">Idea Behind</label>
          <textarea id="idea" name="idea" rows="4" value={formData.idea} onChange={handleChange} required></textarea>

          <label htmlFor="tech">Tech Stack</label>
          <input type="text" id="tech" name="tech" value={formData.tech} onChange={handleChange} required />

          <label htmlFor="type">Type</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange} required>
            <option value="">--Select Type--</option>
            <option value="Web App">Web App</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Desktop Software">Desktop Software</option>
            <option value="Game">Game</option>
            <option value="Research Project">Research Project</option>
          </select>

          <label htmlFor="desc">Description</label>
          <textarea id="desc" name="desc" rows="4" value={formData.desc} onChange={handleChange}></textarea>

          <label htmlFor="file">Upload File</label>
          <input type="file" id="file" name="file" accept=".zip, .rar, .tar, .7z" onChange={handleFileChange} required />

          <button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
