import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // --- FIXED: Exact-ah 2 செகண்ட் (2000ms) கழிச்சு automatic-ah profile page-க்கு மாறும் ---
    const timer = setTimeout(() => {
      navigate('/profile'); // Ungaloda orders list irukra profile path illa home page path-ah kuduthukonga
    }, 2000);

    // Component unmount aagumpothu timer-ah clear panrom (Memory safety)
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={pageContainerStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Poppins:wght@300;400;500;600&display=swap');
        
        @keyframes pulseLeaf {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); opacity: 0.9; }
          100% { transform: scale(1); }
        }
        .animate-leaf {
          animation: pulseLeaf 1.8s infinite ease-in-out;
        }
      `}</style>

      <div style={cardStyle}>
        {/* Animated Big Botanical Vibe Icon */}
        <div className="animate-leaf" style={iconCircleStyle}>
          🌿
        </div>

        <h1 style={brandTitleStyle}>leafy vibe</h1>
        
        <h2 style={successMessageStyle}>Order Successfully Placed! 🎉</h2>
        
        <p style={subTextStyle}>
          Unga botanical plants ordervai naanga purniyama confirm pannitom thala!
        </p>

        {/* Dynamic Small Loader Strip */}
        <div style={loaderContainerStyle}>
          <div style={loaderBarStyle}></div>
        </div>
      </div>
    </div>
  );
};

// --- LEAFY VIBE PREMIUM SUCCESS THEME STYLES ---
const pageContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#fbf9f6',
  fontFamily: '"Poppins", sans-serif',
  padding: '20px',
  boxSizing: 'border-box'
};

const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '40px 30px',
  borderRadius: '24px',
  boxShadow: '0 10px 30px rgba(46, 68, 49, 0.04)',
  border: '1px solid #e0e5dd',
  width: '100%',
  maxWidth: '380px',
  textAlign: 'center',
  boxSizing: 'border-box'
};

const iconCircleStyle = {
  fontSize: '50px',
  width: '90px',
  height: '90px',
  backgroundColor: 'rgba(46, 68, 49, 0.06)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px auto'
};

const brandTitleStyle = {
  fontFamily: '"Cinzel Decorative", serif',
  fontSize: '20px',
  fontWeight: '700',
  letterSpacing: '1px',
  color: '#82927e',
  margin: '0 0 10px 0',
  textTransform: 'lowercase'
};

const successMessageStyle = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#2e4431',
  margin: '0 0 12px 0'
};

const subTextStyle = {
  fontSize: '12px',
  color: '#7a8574',
  lineHeight: '1.6',
  margin: '0 0 25px 0',
  fontWeight: '400'
};

const loaderContainerStyle = {
  width: '100%',
  height: '4px',
  backgroundColor: '#f6f5f0',
  borderRadius: '2px',
  overflow: 'hidden',
  position: 'relative'
};

const loaderBarStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: '#2e4431',
  position: 'absolute',
  left: '-100%',
  animation: 'slideLoader 2s linear forwards'
};

// CSS Keyframe inline addition via standard inject format
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes slideLoader {
    0% { left: -100%; }
    100% { left: 0%; }
  }
`, styleSheet.cssRules.length);

export default OrderSuccess;