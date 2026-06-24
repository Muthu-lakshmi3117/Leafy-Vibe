import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null); 

  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("userId"));
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const savedUserId = sessionStorage.getItem("userId");
    if (!savedUserId) {
      setCartCount(0);
      return;
    }

    axios.get(`http://localhost:3000/carts`, { params: { userId: savedUserId } })
      .then((res) => {
        const totalItems = res.data.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
        setCartCount(totalItems);
      })
      .catch((error) => {
        console.error("Error fetching navbar cart count:", error);
      });
  };

  useEffect(() => {
    setIsLoggedIn(!!sessionStorage.getItem("userId"));
    setShowDropdown(false); 
    updateCartCount();
  }, [location]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('cartUpdated', updateCartCount);
    document.addEventListener("mousedown", handleOutsideClick);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    sessionStorage.clear(); 
    setIsLoggedIn(false);
    setShowDropdown(false);
    setCartCount(0); 
    navigate('/login'); 
  };

  return (
    <nav style={navStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Poppins:wght@300;400;500;600&display=swap');
        
        .nav-link {
          text-decoration: none;
          color: #556251;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: "Poppins", sans-serif;
          transition: color 0.3s ease;
          position: relative;
          padding: 8px 0;
        }

        .nav-link:hover {
          color: #1c261b;
        }

        /* Sophisticated Organic Expansion Underline */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 1.5px;
          background-color: #32412e;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          transform: translateX(-50%);
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link.active {
          color: #1c261b;
          font-weight: 600;
        }

        .cart-wrapper {
          display: flex;
          alignItems: center;
          position: relative;
        }

        .cart-badge {
          background-color: #32412e;
          color: #fbf9f6;
          font-size: 9px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 20px;
          position: absolute;
          top: -6px;
          right: -12px;
          box-shadow: 0 4px 10px rgba(50, 65, 46, 0.3);
          animation: popIn 0.3s ease;
        }

        @keyframes popIn {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }

        .profile-container {
          position: relative;
          display: inline-block;
        }

        .profile-btn {
          text-decoration: none;
          color: #32412e;
          background: transparent;
          border: 1px solid rgba(50, 65, 46, 0.25);
          padding: 8px 22px;
          border-radius: 30px;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-family: "Poppins", sans-serif;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .profile-btn:hover {
          background-color: #32412e;
          color: #fbf9f6;
          border-color: #32412e;
          box-shadow: 0 8px 20px rgba(50, 65, 46, 0.15);
        }

        /* Luxury Frosted Dropdown Menu */
        .dropdown-menu {
          position: absolute;
          right: 0;
          top: 50px;
          background-color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          padding: 12px 0;
          min-width: 190px; 
          z-index: 100;
          border: 1px solid rgba(255, 255, 255, 0.5);
          display: flex;
          flex-direction: column;
          transform: translateY(10px);
          animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideDown {
          to { transform: translateY(0); }
        }

        .dropdown-item {
          text-decoration: none;
          color: #556251;
          padding: 10px 24px;
          font-size: 12.5px;
          font-family: "Poppins", sans-serif;
          font-weight: 500;
          transition: all 0.2s ease;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
        }

        .dropdown-item:hover {
          background-color: rgba(50, 65, 46, 0.06);
          color: #1c261b;
          padding-left: 28px;
        }

        .dropdown-divider {
          height: 1px;
          background-color: rgba(50, 65, 46, 0.08);
          margin: 8px 0;
        }
        
        .logout-btn {
          color: #ba4343;
        }
        .logout-btn:hover {
          background-color: rgba(186, 67, 67, 0.08);
          color: #8a2b2b;
        }
      `}</style>

      {/* BRANDING SECTION */}
      <div style={logoWrapperStyle}>
        <Link to="/" style={logoStyle}>
          leafy vibe
        </Link>
        <span style={subLogoStyle}>Botanical Studio</span>
      </div>

      {/* NAVIGATION INTERFACES */}
      <div style={menuStyle}>
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
        <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`}>Shop</Link>
        <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
        <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
        
        <Link to="/cart" className={`nav-link ${isActive('/cart') ? 'active' : ''}`} style={{ marginRight: '8px' }}>
          <div className="cart-wrapper">
            <span>Cart 🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </Link>

        {/* DYNAMIC AVATAR CONTROL INTERACTION */}
        <div className="profile-container" ref={dropdownRef}>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="profile-btn"
              >
                <span>👤</span> Account
              </button>

              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">My Profile</Link>
                  <Link to="/orders" className="dropdown-item">My Orders</Link>
                  <Link to="/cancelled-orders" className="dropdown-item" style={{ color: '#dc2626' }}>
                    Cancelled Orders
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="profile-btn">
              <span>👤</span> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- PREMIUM BLURRED GLASS CODES CONFIGS ---
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '18px 60px', 
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(20px)',
  webkitBackdropFilter: 'blur(20px)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  borderBottom: '1px solid rgba(50, 65, 46, 0.06)',
  boxShadow: '0 10px 30px rgba(50, 65, 46, 0.02)'
};

const logoWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left'
};

const logoStyle = {
  fontFamily: '"Cinzel", serif',
  fontWeight: '700',
  fontSize: '22px',
  letterSpacing: '3px',
  color: '#2a3626',
  textDecoration: 'none',
  textTransform: 'uppercase'
};

const subLogoStyle = {
  fontFamily: '"Poppins", sans-serif',
  fontSize: '9px',
  letterSpacing: '2px',
  color: '#768272',
  textTransform: 'uppercase',
  marginTop: '2px',
  fontWeight: '500'
};

const menuStyle = {
  display: 'flex',
  gap: '40px',
  alignItems: 'center'
};

export default Navbar;