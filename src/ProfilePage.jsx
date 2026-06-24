import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ 
    name: "Loading...", 
    email: "Loading...",
    mobile: "Loading..." 
  });
  const [err, setErr] = useState("");

  const currentUserId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!currentUserId) {
      navigate('/login');
      return;
    }

    axios.get("http://localhost:3000/user")
      .then((res) => {
        console.log("Backend Response Data:", res.data);
        const usersList = Array.isArray(res.data) ? res.data : res.data.users || [];

        if (usersList.length === 0) {
          setErr("No users found in database.");
          return;
        }

        const activeUser = usersList.find(user => 
          (user.userId && user.userId == currentUserId) || 
          (user.id && user.id == currentUserId) || 
          (user._id && user._id == currentUserId)
        );
        
        if (activeUser) {
          setUserData({
            name: activeUser.name || activeUser.username || "Registered Customer",
            email: activeUser.email || "No Email Provided",
            mobile: activeUser.num || activeUser.mobile || activeUser.phone || "No Mobile Provided"
          });
          setErr(""); 
        } else {
          setErr("User Profile Not Found in Database.");
        }
      })
      .catch((error) => {
        console.error("Profile fetch failed:", error);
        setErr("Server connection error.");
      });
  }, [currentUserId, navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    navigate('/login');
  };

  // Extract first letter of name for the premium monogram avatar
  const avatarLetter = userData.name ? userData.name.charAt(0).toUpperCase() : "M";

  return (
    <div style={containerStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        
        body { 
          background-color: #FAF9F5; 
        }

        .editorial-wrapper {
          background: #ffffff;
          border-radius: 32px;
          padding: 45px;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 30px 70px rgba(18, 28, 20, 0.04);
          border: 1px solid #EFECE3;
          position: relative;
          overflow: hidden;
        }

        .premium-field {
          background: #FAF9F5;
          border-radius: 16px;
          padding: 16px 20px;
          border: 1px solid transparent;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .premium-field:hover {
          background: #ffffff;
          border-color: #D3CFC4;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(18, 28, 20, 0.03);
        }

        .action-shop-btn {
          flex: 2;
          background-color: #121c14;
          color: #FAF9F5;
          border: none;
          border-radius: 14px;
          padding: 16px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .action-shop-btn:hover {
          background-color: #233627;
          box-shadow: 0 12px 24px rgba(18, 28, 20, 0.15);
          transform: translateY(-1px);
        }

        .action-logout-btn {
          flex: 1;
          background-color: transparent;
          color: #A34848;
          border: 1px solid #F2E4E4;
          border-radius: 14px;
          padding: 16px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .action-logout-btn:hover {
          background-color: #FFF5F5;
          border-color: #E0C3C3;
        }
      `}</style>

      <div className="editorial-wrapper">
        {/* Header Section with Elegant Minimal Monogram */}
        <div style={headerContainerStyle}>
          <div style={monogramAvatarStyle}>
            {avatarLetter}
          </div>
          <div style={titleHeaderStyle}>
            <span style={badgeStyle}>Verified Account</span>
            <h2 style={profileTitleStyle}>Dashboard Overview</h2>
          </div>
        </div>

        {err && (
          <div style={errorContainerStyle}>
            <span style={{ fontSize: '14px' }}>⚠️</span> {err}
          </div>
        )}

        {/* Data Fields */}
        <div style={detailsBlockStyle}>
          {/* Full Name */}
          <div className="premium-field" style={infoRowStyle}>
            <span style={labelStyle}>MEMBER NAME</span>
            <span style={valueStyle}>{userData.name}</span>
          </div>

          {/* Email Address */}
          <div className="premium-field" style={infoRowStyle}>
            <span style={labelStyle}>DIGITAL ADDR</span>
            <span style={valueStyle}>{userData.email}</span>
          </div>

          {/* Mobile Number */}
          <div className="premium-field" style={infoRowStyle}>
            <span style={labelStyle}>COMMUNICATION NODE</span>
            <span style={valueStyle}>{userData.mobile}</span>
          </div>
        </div>

        <div style={dividerStyle}></div>

        {/* Bottom Actions */}
        <div style={ctaContainerStyle}>
          <button className="action-shop-btn" onClick={() => navigate('/products')}>
            Browse Collections 🛒
          </button>
          <button className="action-logout-btn" onClick={handleLogout}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

// --- STYLING GRAPHICS ---
const containerStyle = { 
  padding: '24px', 
  minHeight: '100vh', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  fontFamily: '"Plus Jakarta Sans", sans-serif', 
  boxSizing: 'border-box' 
};

const headerContainerStyle = { 
  display: 'flex', 
  alignItems: 'center', 
  gap: '20px', 
  marginBottom: '35px',
  textAlign: 'left'
};

const monogramAvatarStyle = { 
  width: '64px', 
  height: '64px', 
  borderRadius: '20px', 
  backgroundColor: '#121c14', 
  color: '#FAF9F5',
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  fontSize: '22px', 
  fontFamily: '"Cinzel", serif',
  fontWeight: '600',
  boxShadow: '0 10px 20px rgba(18, 28, 20, 0.08)'
};

const titleHeaderStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px'
};

const profileTitleStyle = { 
  margin: '0', 
  fontSize: '22px', 
  fontWeight: '700', 
  color: '#121c14',
  letterSpacing: '-0.3px'
};

const badgeStyle = { 
  fontSize: '10px', 
  letterSpacing: '1px', 
  color: '#8A9485', 
  textTransform: 'uppercase', 
  fontWeight: '700'
};

const dividerStyle = { 
  width: '100%', 
  height: '1px', 
  background: '#EFECE3', 
  margin: '28px 0' 
};

const detailsBlockStyle = { 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '14px', 
  width: '100%' 
};

const infoRowStyle = { 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '4px' 
};

const labelStyle = { 
  fontSize: '9px', 
  color: '#9E9A8E', 
  textTransform: 'uppercase', 
  fontWeight: '700',
  letterSpacing: '0.8px'
};

const valueStyle = { 
  fontSize: '14px', 
  color: '#121c14', 
  fontWeight: '500' 
};

const errorContainerStyle = {
  padding: '12px 18px',
  backgroundColor: '#FFF5F5',
  border: '1px solid #FCDEDE',
  borderRadius: '12px',
  color: '#A34848',
  fontSize: '13px',
  fontWeight: '500',
  textAlign: 'left',
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const ctaContainerStyle = { 
  display: 'flex', 
  gap: '12px', 
  width: '100%' 
};

export default ProfilePage;