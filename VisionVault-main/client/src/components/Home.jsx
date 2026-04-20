import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = ({ user, setUser }) => {
  const [navVisible, setNavVisible] = useState(false);
  const [activeContributor, setActiveContributor] = useState('Top Contributors');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('/api/logout');
      setUser(null);
      navigate('/home');
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  const contributorData = {
    'Top Contributors': [
      { name: 'Alice: 24 uploads', desc: 'Engaged contributor' },
      { name: 'Bob: 20 uploads', desc: 'Engaged contributor' },
      { name: 'Carol: 18 uploads', desc: 'Engaged contributor' }
    ],
    'Average Contributors': [
      { name: 'Dave: 12 uploads', desc: 'Engaged contributor' },
      { name: 'Eve: 10 uploads', desc: 'Engaged contributor' },
      { name: 'Frank: 9 uploads', desc: 'Engaged contributor' }
    ],
    'Low Contributors': [
      { name: 'Grace: 3 uploads', desc: 'Engaged contributor' },
      { name: 'Heidi: 2 uploads', desc: 'Engaged contributor' },
      { name: 'Ivan: 1 upload', desc: 'Engaged contributor' }
    ]
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div className="container header-container">
          <Link to="/home" className="logo">Vision <span>Vault</span></Link>
          <nav>
            <ul style={{ display: navVisible ? 'flex' : '' }}>
              <li><Link to="/home">Home</Link></li>
              <li><a href="#">Explore</a></li>
              <li><Link to="/upload">Upload</Link></li>
              <li><a href="#">Top</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </nav>
          {user ? (
            <button onClick={handleLogout} className="btn btn-primary">Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
          <button className="hamburger" onClick={() => setNavVisible(!navVisible)}>☰</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container" style={{ display: 'flex' }}>
          <div className="hero-content">
            <h1>Showcase. Collaborate. Innovate.</h1>
            <p>Make your projects visible to the community, gather valuable feedback and insights, and get recommendations helping to suggest mentor, newest projects etc.</p>
            <div className="hero-buttons">
              <a href="#" className="btn btn-primary">Explore</a>
              {!user ? (
                <Link to="/login" className="btn btn-primary">Upload</Link>
              ) : (
                <Link to="/upload" className="btn btn-outline">Upload</Link>
              )}
            </div>
            <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#777' }}>
              <p>Customise for creators</p>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/image1.jpg" alt="Hero Image" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Sort the projects, align them, manage your students.</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-image">
                <img src="/images/aiml.jpg" alt="AI/ML" />
              </div>
              <div className="feature-content">
                <h3>AI/ML</h3>
                <p>AI/ML projects to enhance data learning capabilities. Data processing and representation to create valuable products across industries, finance, and technology.</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-image">
                <img src="/images/fullstack.jpg" alt="Full Stack" />
              </div>
              <div className="feature-content">
                <h3>Full-Stack</h3>
                <p>Full stack projects integrate frontend, backend, and database technologies. Develop creative solutions to real-world problems.</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-image">
                <img src="/images/cloud.jpg" alt="Cloud" />
              </div>
              <div className="feature-content">
                <h3>Cloud</h3>
                <p>Stream hosting that encompasses CDN, API endpoint development from back-end and create elastic resources.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="ai-section">
        <div className="container">
          <div className="ai-content">
            <h2>Manage your interactions with AI</h2>
            <p>Sort, align easily with our AI feature</p>
            <div style={{ marginTop: '15px' }}>
              <a href="#" className="btn btn-outline">Explore</a>
            </div>
          </div>

          <div className="ai-features">
            <div className="ai-card">
              <div className="ai-header">
                <div style={{ color: '#3498db' }}>AI Queue Manager</div>
                <div style={{ background: '#333', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>AI</div>
              </div>
              <img src="/images/decorate4.jpg" alt="AI Image 1" />
              <div style={{ color: '#888', fontSize: '0.8rem' }}>updated 15 mins</div>
              <div style={{ marginTop: '50px', fontSize: '0.9rem' }}>Auto update</div>
              <div style={{ color: '#888', fontSize: '0.8rem' }}>Get the optimal results on your interactions with AI.</div>
            </div>
            <div className="ai-card">
              <div className="ai-header">
                <div style={{ color: '#f39c12' }}>Live Test Node</div>
                <div style={{ background: '#333', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>Web</div>
              </div>
              <img src="/images/decorate1.jpg" alt="AI Image 2" />
              <div style={{ color: '#888', fontSize: '0.8rem' }}>Your task interface 2</div>
              <div style={{ marginTop: '50px', fontSize: '0.9rem' }}>Network Interface</div>
              <div style={{ color: '#888', fontSize: '0.8rem' }}>Manage interface calls. All interfaces show real-time data.</div>
            </div>
          </div>

          <div className="ai-footer">
            <div className="ai-feature-card">
              <h3>Connect Features</h3>
              <p style={{ color: '#888', fontSize: '0.8rem' }}>Easily create content for the project from the database.</p>
            </div>
            <div className="ai-feature-card">
              <h3>Integrate Files Easily</h3>
              <p style={{ color: '#888', fontSize: '0.8rem' }}>Our platform simplifies config files and final mounting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="dashboard">
        <div className="container">
          <h2>Exclusive Dashboard Features</h2>
          <div className="dashboard-buttons" style={{ marginBottom: '30px' }}>
            {!user && <Link to="/login" className="btn btn-primary">Login</Link>}
          </div>
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="dashboard-icon"><img src="/images/logo1.jpg" alt="logo" /></div>
              <h3>Total Submitted</h3>
              <p>Keep track of your latest projects.</p>
            </div>
            <div className="dashboard-card">
              <div className="dashboard-icon"><img src="/images/logo2.jpg" alt="logo" /></div>
              <h3>Saved Projects</h3>
              <p>Your storage of your colleagues that interest you.</p>
            </div>
            <div className="dashboard-card">
              <div className="dashboard-icon"><img src="/images/logo3.jpg" alt="logo" /></div>
              <h3>Achievements</h3>
              <p>Stay track of your metrics and your best works.</p>
            </div>
            <div className="dashboard-card">
              <div className="dashboard-icon"><img src="/images/logo4.jpg" alt="logo" /></div>
              <h3>Gather Feedback</h3>
              <p>Gather and manage feedback on your projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Section */}
      <section className="organization">
        <div className="container">
          <h2>A platform to benefit the entire organization</h2>
          <div className="contributors-nav">
            {Object.keys(contributorData).map((type) => (
              <button 
                key={type} 
                className={activeContributor === type ? 'active' : ''}
                onClick={() => setActiveContributor(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="contributors-grid">
            {contributorData[activeContributor].map((item, idx) => (
              <div className="contributor-card" key={idx}>
                <div style={{ marginBottom: '10px' }}>✓</div>
                <div style={{ color: '#888', fontSize: '0.8rem' }}>
                  {item.name}<br />{item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="community">
        <div className="container">
          <h2>Join our Community</h2>
          <div style={{ marginTop: '20px' }}>
            <Link to="/signup" className="btn btn-outline">Sign Up</Link>
          </div>
          <div className="community-images">
            <img src="/images/computer.jpg" alt="Community Image 1" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-container">
          <div className="social-links">
            <a href="#"><img src="/images/x.png" alt="X" /></a>
            <a href="#"><img src="/images/linkedin.png" alt="LinkedIn" /></a>
            <a href="#"><img src="/images/github.png" alt="GitHub" /></a>
            <a href="#"><img src="/images/logo_main.png" alt="Logo" /></a>
          </div>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
