import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Poppins:wght@300;400;500;600&display=swap');
        
        .footer-link {
          text-decoration: none;
          color: #768272;
          font-size: 13px;
          font-family: "Poppins", sans-serif;
          font-weight: 400;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }

        .footer-link:hover {
          color: #1b2e1e;
          transform: translateX(3px);
        }

        .social-icon {
          text-decoration: none;
          color: #62725e;
          font-size: 14px;
          font-family: "Poppins", sans-serif;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .social-icon:hover {
          color: #1b2e1e;
        }
      `}</style>

      <div style={containerStyle}>
        <div style={columnStyle}>
          <h2 style={logoStyle}>leafy vibe</h2>
          <p style={descriptionStyle}>
            Bringing nature's silent poetry into your concrete spaces. Curated boutique plant studio sourcing responsibly since 2026.
          </p>
          <div style={socialWrapperStyle}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">Instagram</a>
            <span style={{ color: '#e0e5dd' }}>•</span>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="social-icon">Pinterest</a>
            <span style={{ color: '#e0e5dd' }}>•</span>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">Facebook</a>
          </div>
        </div>

  
        <div style={columnStyle}>
          <h4 style={headingStyle}>Explore</h4>
          <ul style={listStyle}>
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/products" className="footer-link">Shop Plants</Link></li>
            <li><Link to="/about" className="footer-link">Our Story</Link></li>
            <li><Link to="/contact" className="footer-link">Get In Touch</Link></li>
          </ul>
        </div>

        <div style={columnStyle}>
          <h4 style={headingStyle}>Studio Hours</h4>
          <p style={infoTextStyle}>📍 Madurai, Tamil Nadu, India</p>
          <p style={infoTextStyle}>🌿 Mon - Sat: 09:00 AM - 08:00 PM</p>
          <p style={infoTextStyle}>💌 helloleafyvibe@gmail.com</p>
        </div>

      </div>

      
      <div style={bottomBarStyle}>
        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(46, 68, 49, 0.06)', marginBottom: '20px' }}></div>
        <p style={copyrightTextStyle}>
          &copy; {new Date().getFullYear()} <strong>leafy vibe</strong>. All rights reserved. Made for green spaces.
        </p>
      </div>
    </footer>
  );
};
const footerStyle = {
  backgroundColor: '#ffffff',
  borderTop: '1px solid rgba(46, 68, 49, 0.05)',
  padding: '60px 45px 30px 45px',
  width: '100%',
  boxSizing: 'border-box',
  marginTop: 'auto'
};

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '40px',
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%'
};

const columnStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left'
};

const logoStyle = {
  fontFamily: '"Cinzel Decorative", serif',
  fontWeight: '700',
  fontSize: '20px',
  letterSpacing: '2px',
  color: '#1b2e1e',
  margin: '0 0 12px 0',
  textTransform: 'lowercase'
};

const descriptionStyle = {
  fontFamily: '"Poppins", sans-serif',
  fontSize: '12.5px',
  color: '#768272',
  lineHeight: '1.6',
  margin: '0 0 20px 0',
  fontWeight: '300',
  maxWidth: '320px'
};

const socialWrapperStyle = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center'
};

const headingStyle = {
  fontFamily: '"Poppins", sans-serif',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
  color: '#1b2e1e',
  margin: '0 0 20px 0'
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

const infoTextStyle = {
  fontFamily: '"Poppins", sans-serif',
  fontSize: '13px',
  color: '#768272',
  margin: '0 0 10px 0',
  fontWeight: '400'
};

const bottomBarStyle = {
  maxWidth: '1200px',
  margin: '40px auto 0 auto',
  width: '100%',
  textAlign: 'center'
};

const copyrightTextStyle = {
  fontFamily: '"Poppins", sans-serif',
  fontSize: '11px',
  color: '#a1aba0',
  margin: 0,
  letterSpacing: '0.3px'
};

export default Footer;