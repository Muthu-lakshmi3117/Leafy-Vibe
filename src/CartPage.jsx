import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const [toast, setToast] = useState({ show: false, message: "", isSuccess: true });

  useEffect(() => {
    const savedUserId = sessionStorage.getItem("userId");

    if (!savedUserId) {
      showToastMessage("Please login to view your cart! 🔐", false);
      setTimeout(() => navigate("/login"), 2000);
      return; 
    }

    // Fetch user specific cart lines from database
    axios.get(`http://localhost:3000/carts`, { params: { userId: savedUserId } })
      .then((res) => {
        // --- FIXED CRITICAL FILTER: Buy Now & Reorder bypass check ---
        // isDirectCheckout flag true-ah irundha adhai cart summary view-la irundhu reject panrom
        const regularCartItems = res.data.filter(item => item.isDirectCheckout !== true);
        setCartItems(regularCartItems); 
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
        setErr("Cart items-a load seiyya mudiyavillai.");
      });
  }, [navigate]);

  const showToastMessage = (message, isSuccess = true) => {
    setToast({ show: true, message, isSuccess });
    setTimeout(() => {
      setToast({ show: false, message: "", isSuccess: true });
    }, 2000); 
  };

  const triggerNavbarUpdate = () => {
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleIncrement = (id, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    
    axios.put(`http://localhost:3000/cart/update/${id}`, { quantity: newQuantity })
      .then(() => {
        const updatedCart = cartItems.map(item => 
          (item._id === id || item.id === id) ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        triggerNavbarUpdate();
      })
      .catch(err => console.error("Quantity update failed:", err));
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity <= 1) return; 
    const newQuantity = currentQuantity - 1;
    
    axios.put(`http://localhost:3000/cart/update/${id}`, { quantity: newQuantity })
      .then(() => {
        const updatedCart = cartItems.map(item => 
          (item._id === id || item.id === id) ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        triggerNavbarUpdate();
      })
      .catch(err => console.error("Quantity update failed:", err));
  };

  const handleRemoveItem = (id, title) => {
    axios.delete(`http://localhost:3000/cart/delete/${id}`)
      .then(() => {
        const updatedCart = cartItems.filter(item => (item._id || item.id) !== id);
        setCartItems(updatedCart);
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        triggerNavbarUpdate();
        showToastMessage(`${title || "Item"} removed from cart! 🌿`, true);
      })
      .catch((error) => {
        console.error("Backend delete failed:", error);
        showToastMessage("Could not remove item. Try again! ⚠️", false);
      });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.quantity) || 1)), 0);
  };

  const handleProceedToCheckout = () => {
    navigate('/address', { state: { items: cartItems } });
  };

  return (
    <div style={pageStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        .leafy-toast {
          position: fixed;
          top: 90px;
          right: 30px;
          padding: 14px 24px;
          border-radius: 12px;
          color: #f7f9f6;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 2000;
          box-shadow: 0 10px 25px rgba(46, 68, 49, 0.15);
          transform: translateX(120%);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          backdrop-filter: blur(8px);
        }
        .leafy-toast.show {
          transform: translateX(0);
        }

        @media (max-width: 900px) {
          .main-layout-container {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .left-products-panel, .right-bill-panel {
            width: 100% !important;
            max-width: 100% !important;
          }
          .right-bill-panel {
            position: static !important;
          }
        }
      `}</style>

      <div className={`leafy-toast ${toast.show ? 'show' : ''}`}
        style={{ backgroundColor: toast.isSuccess ? 'rgba(46, 68, 49, 0.95)' : 'rgba(179, 93, 93, 0.95)' }}>
        <span>{toast.message}</span>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontFamily: '"Poppins", sans-serif', fontSize: '26px', fontWeight: '600', letterSpacing: '3px', color: '#1a1a1a', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
          YOUR CART 🛒
        </h2>
        <div style={{ width: '30px', height: '1px', background: '#1a1a1a', margin: '10px auto' }}></div>
      </div>
      
      {err && <p style={{ color: 'red', textAlign: 'center' }}>{err}</p>}

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{ color: '#6a7566', fontStyle: 'italic', marginBottom: '20px' }}>
            Your botanical cart is empty 🌿
          </p>
          <button onClick={() => navigate('/products')} style={seeMoreProductsBtnStyle}>
            See More Products 🌿
          </button>
        </div>
      ) : (
        <div className="main-layout-container" style={mainLayoutContainer}>
          
          {/* LEFT PANEL */}
          <div className="left-products-panel" style={{ width: '66%', boxSizing: 'border-box' }}>
            <div style={leftGridWrapperStyle}>
              {cartItems.map((item, index) => {
                const itemId = item._id || item.id;
                
                const displayImage = 
                  item.image ? item.image : 
                  item.img ? item.img :
                  item.imageUrl ? item.imageUrl :
                  (item.productId && typeof item.productId === 'object' && item.productId.image) ? item.productId.image :
                  (item.productId && typeof item.productId === 'object' && item.productId.img) ? item.productId.img :
                  (item.productId && typeof item.productId === 'object' && item.productId.imageUrl) ? item.productId.imageUrl :
                  "https://placehold.co/240x240?text=No+Image+Found"; 

                const displayTitle = 
                  item.title || item.name || 
                  (item.productId && item.productId.title) || 
                  (item.productId && item.productId.name) || 
                  "Botanical Plant";

                return (
                  <div key={index} style={cardStyle}>
                    
                    <div style={imageContainerStyle}>
                      <img 
                        src={displayImage} 
                        alt={displayTitle} 
                        style={imageStyle} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/240x240?text=Image+Load+Error";
                        }}
                      />
                    </div>
                    
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                      <h4 style={titleStyle}>{displayTitle}</h4>
                      <p style={priceStyle}>Rs. {item.price}</p>
                    </div>
                    
                    <div style={actionRowStyle}>
                      <div style={quantityPanelStyle}>
                        <button onClick={() => handleDecrement(itemId, item.quantity || 1)} style={counterBtnStyle}>-</button>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#2a3626' }}>{item.quantity || 1}</span>
                        <button onClick={() => handleIncrement(itemId, item.quantity || 1)} style={counterBtnStyle}>+</button>
                      </div>

                      <button onClick={() => handleRemoveItem(itemId, displayTitle)} style={removeTextStyle}>
                        Remove
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="right-bill-panel" style={summaryPanelStyle}>
            <h3 style={summaryTitleStyle}>Order Summary</h3>
            <div style={{ width: '100%', height: '1px', background: 'rgba(42, 54, 38, 0.1)', marginBottom: '15px' }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px', maxHeight: '180px', overflowY: 'auto' }}>
              {cartItems.map((item, idx) => {
                const displayTitle = 
                  item.title || item.name || 
                  (item.productId && item.productId.title) || 
                  (item.productId && item.productId.name) || 
                  "Plant";

                return (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#4a5347' }}>
                    <span style={{ textTransform: 'capitalize', textAlign: 'left', paddingRight: '10px' }}>
                      {displayTitle} <span style={{ color: '#8b9687', fontSize: '12px' }}>x{item.quantity || 1}</span>
                    </span>
                    <span>₹{(Number(item.price) || 0) * (Number(item.quantity) || 1)}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ width: '100%', height: '1px', background: 'rgba(42, 54, 38, 0.1)', marginBottom: '15px' }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '600', marginBottom: '25px' }}>
              <span>Total Price:</span>
              <span style={{ color: '#2a3626' }}>₹{calculateSubtotal()}</span>
            </div>
            
            <button onClick={handleProceedToCheckout} style={checkoutBtnStyle}>
              Proceed to Checkout
            </button>

            <button onClick={() => navigate('/products')} style={{ ...seeMoreProductsBtnStyle, marginTop: '15px', width: '100%' }}>
              See More Products 🌿
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

// Styles Configuration Layer
const pageStyle = { padding: '60px 40px', fontFamily: '"Poppins", sans-serif', backgroundColor: '#f6f5f0', minHeight: '100vh', boxSizing: 'border-box' };
const mainLayoutContainer = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '30px', width: '100%', maxWidth: '1200px', margin: '0 auto' };
const leftGridWrapperStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', width: '100%', boxSizing: 'border-box' };
const cardStyle = { backgroundColor: '#ffffff', padding: '18px', borderRadius: '16px', border: '1px solid rgba(42, 54, 38, 0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: '14px', boxSizing: 'border-box', boxShadow: '0 4px 15px rgba(42, 54, 38, 0.02)', height: '350px' };
const imageContainerStyle = { width: '100%', height: '180px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f1f0ea', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const imageStyle = { width: '100%', height: '100%', objectFit: 'cover' };
const titleStyle = { margin: '0', color: '#2a3626', fontSize: '15px', fontWeight: '500', letterSpacing: '0.3px', textTransform: 'capitalize', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };
const priceStyle = { margin: '2px 0 0 0', color: '#6a7566', fontSize: '14px', fontWeight: '400' };
const actionRowStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '4px' };
const quantityPanelStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', backgroundColor: '#f6f5f0', padding: '6px 12px', borderRadius: '8px', width: '60%', boxSizing: 'border-box' };
const counterBtnStyle = { backgroundColor: 'transparent', color: '#2a3626', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600', padding: '0 4px' };
const removeTextStyle = { background: 'none', border: 'none', color: '#b35d5d', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px', cursor: 'pointer', padding: '4px 0', fontFamily: '"Poppins", sans-serif', transition: 'color 0.2s ease', textDecoration: 'underline', textUnderlineOffset: '3px' };
const summaryPanelStyle = { backgroundColor: '#ffffff', padding: '30px', borderRadius: '20px', border: '1px solid rgba(42, 54, 38, 0.08)', boxShadow: '0 10px 30px rgba(42, 54, 38, 0.03)', width: '30%', minWidth: '300px', boxSizing: 'border-box', position: 'sticky', top: '120px' };
const summaryTitleStyle = { margin: '0 0 15px 0', fontSize: '18px', fontWeight: '600', color: '#2a3626', textTransform: 'uppercase', letterSpacing: '1px' };
const checkoutBtnStyle = { backgroundColor: '#2a3626', color: '#f6f5f0', border: 'none', padding: '14px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: '500', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', width: '100%', fontFamily: '"Poppins", sans-serif' };
const seeMoreProductsBtnStyle = { backgroundColor: 'transparent', color: '#2a3626', border: '1px solid #2a3626', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: '500', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: '"Poppins", sans-serif', transition: 'all 0.3s ease', boxSizing: 'border-box' };

export default CartPage;