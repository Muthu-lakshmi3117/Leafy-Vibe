import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Bill page track panni vantha states extraction
  const { items, address, totalAmount } = location.state || { items: [], address: {}, totalAmount: 0 };
  const userId = sessionStorage.getItem("userId");

  // Payment UI Controls States (upi, card, cod)
  const [activeTab, setActiveTab] = useState('upi'); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');

  // Upgraded custom toast container state management
  const [toast, setToast] = useState({ show: false, message: "", isSuccess: true });

  const showToastMessage = (message, isSuccess = true) => {
    setToast({ show: true, message, isSuccess });
    setTimeout(() => {
      setToast({ show: false, message: "", isSuccess: true });
    }, 3000);
  };

  const handlePaymentSubmitAndSave = (e) => {
    e.preventDefault();

    if (!userId) {
      showToastMessage("Authentication timeout! Please log in again. 🔐", false);
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    setIsProcessing(true);

    // Orders page parser schema breakdown format matrix
    const structuredItemsForDb = items.map(item => ({
      title: item.title || item.name, 
      quantity: item.quantity || item.qty || 1,
      price: Number(item.price) || 0,
      image: item.image || item.img || "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=150"
    }));

    // Payment method indicators setup
    const selectedMethod = activeTab === 'upi' ? 'UPI' : activeTab === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery';

    const finalOrderPayload = {
      userId: userId,
      items: structuredItemsForDb,
      total: totalAmount, // Fixed reference fallback key match
      status: "Order Confirmed", // Aligned directly with orders page UI
      address: address,
      paymentMethod: selectedMethod,
      date: new Date().toISOString()
    };

    // Simulation transaction latency delay logic wrapper
    setTimeout(() => {
      fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(finalOrderPayload)
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Database injection failed during checkout process.');
        }
        return response.text();
      })
      .then((data) => {
        console.log("Database successfully recorded your checkout metadata:", data);
        setIsProcessing(false);
        
        // Show context matching toast confirmation banner
        if (activeTab === 'cod') {
          showToastMessage("Order confirmed via Cash on Delivery! 📦", true);
        } else {
          showToastMessage("Payment successful & order placed! 🌿✨", true);
        }

        setTimeout(() => {
          navigate('/orders');
        }, 2000);
      })
      .catch((error) => {
        console.error("Critical submission error to server node handler:", error);
        showToastMessage("Something went wrong! Order could not be placed. ⚠️", false);
        setIsProcessing(false);
      });
    }, 1500);
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap');
        
        .payment-box {
          background: #ffffff;
          padding: 40px 35px;
          margin: 0 auto;
          max-width: 500px;
          border-radius: 24px;
          border: 1px solid rgba(46, 68, 49, 0.08);
          box-shadow: 0 10px 40px rgba(46, 68, 49, 0.03);
        }
        .pay-tab-btn {
          flex: 1;
          padding: 12px 6px;
          background: #f4f6f3;
          border: 1px solid rgba(46, 68, 49, 0.05);
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #62725e;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .pay-tab-btn.first { border-radius: 12px 0 0 12px; }
        .pay-tab-btn.last { border-radius: 0 12px 12px 0; }
        .pay-tab-btn.active {
          background: #2e4431;
          color: #ffffff;
          border-color: #2e4431;
        }
        .input-field {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-family: 'Poppins', sans-serif;
          font-size: 13.5px;
          color: #1e293b;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }
        .input-field:focus {
          border-color: #2e4431;
        }
        .submit-pay-btn {
          background-color: #2e4431;
          color: #fff;
          border: none;
          padding: 16px;
          border-radius: 12px;
          width: 100%;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: background 0.2s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }
        .submit-pay-btn:disabled {
          background-color: #82927e;
          cursor: not-allowed;
        }

        /* Standardized Premium Toast Banner System CSS configuration rules */
        .leafy-toast {
          position: fixed;
          top: 40px;
          right: 30px;
          padding: 14px 24px;
          border-radius: 12px;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 2500;
          box-shadow: 0 10px 25px rgba(46, 68, 49, 0.15);
          transform: translateY(-50px) scale(0.9);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        .leafy-toast.show { 
          transform: translateY(0) scale(1); 
          opacity: 1; 
        }
        .leafy-toast.toast-success { 
          background-color: rgba(244, 246, 243, 0.95); 
          border-left: 5px solid #2e4431; 
          color: #1b2e1e;
        }
        .leafy-toast.toast-error { 
          background-color: rgba(253, 242, 242, 0.95); 
          border-left: 5px solid #dc2626; 
          color: #7f1d1d;
        }
      `}</style>

      {/* --- BOTANICAL FLOATING TOAST POPUP LAYER --- */}
      <div className={`leafy-toast ${toast.show ? 'show' : ''} ${toast.isSuccess ? 'toast-success' : 'toast-error'}`}>
        <span>{toast.message}</span>
      </div>

      <div className="payment-box">
        <h2 style={titleStyle}>Checkout Gateway</h2>
        <p style={subTitleStyle}>Select preferred gateway module to finalize order dispatch timeline.</p>
        
        {/* Payable Display */}
        <div style={amountCardStyle}>
          <span style={{ fontSize: '11px', color: '#82927e', letterSpacing: '1px', fontWeight: '600' }}>TOTAL AMOUNT PAYABLE</span>
          <span style={{ fontSize: '26px', fontWeight: '700', color: '#1b2e1e', marginTop: '2px' }}>₹{totalAmount}</span>
        </div>

        {/* Updated Horizontal Payment 3-Tab Switcher Mode Controls */}
        <div style={{ display: 'flex', marginBottom: '28px' }}>
          <button 
            type="button" 
            className={`pay-tab-btn first ${activeTab === 'upi' ? 'active' : ''}`}
            onClick={() => setActiveTab('upi')}
          >
            📱 UPI / GPay
          </button>
          <button 
            type="button" 
            className={`pay-tab-btn ${activeTab === 'card' ? 'active' : ''}`}
            onClick={() => setActiveTab('card')}
          >
            Ref Card
          </button>
          <button 
            type="button" 
            className={`pay-tab-btn last ${activeTab === 'cod' ? 'active' : ''}`}
            onClick={() => setActiveTab('cod')}
          >
            💵 Cash on Delivery
          </button>
        </div>

        {/* Form conditional fields renderer block */}
        <form onSubmit={handlePaymentSubmitAndSave} style={{ textAlign: 'left' }}>
          
          {activeTab === 'upi' && (
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Enter UPI ID</label>
              <input 
                type="text" 
                placeholder="username@okaxis or phoneNo@ybl" 
                className="input-field"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                required
              />
              <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginTop: '6px' }}>
                * A collect request will be pushed to your active mobile application.
              </span>
            </div>
          )}

          {activeTab === 'card' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={labelStyle}>Cardholder Name</label>
                <input 
                  type="text" 
                  placeholder="Laxmi" 
                  className="input-field"
                  value={cardData.name}
                  onChange={(e) => setCardData({...cardData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Card Number</label>
                <input 
                  type="text" 
                  maxLength="16"
                  placeholder="4321 5678 9012 3456" 
                  className="input-field"
                  value={cardData.number}
                  onChange={(e) => setCardData({...cardData, number: e.target.value})}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    maxLength="5"
                    className="input-field"
                    value={cardData.expiry}
                    onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>CVV</label>
                  <input 
                    type="password" 
                    placeholder="***" 
                    maxLength="3"
                    className="input-field"
                    value={cardData.cvv}
                    onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cod' && (
            <div style={codAlertCardStyle}>
              <span style={{ fontSize: '20px' }}>📦</span>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '13.5px', color: '#2e4431', fontWeight: '600' }}>Cash on Delivery Service Verification</h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#62725e', lineHeight: '1.5' }}>
                  Pay with cash when items are delivered to your address. Extra handling or convenience fees are fully waived.
                </p>
              </div>
            </div>
          )}

          {/* Dynamic submit trigger button container */}
          <button 
            type="submit" 
            className="submit-pay-btn"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span>⏳ Processing Order Assets...</span>
            ) : activeTab === 'cod' ? (
              <span>Confirm Order via COD (₹{totalAmount})</span>
            ) : (
              <span>Securely Pay ₹{totalAmount}</span>
            )}
          </button>
        </form>

        <div style={badgeContainerStyle}>
          <span>🔒 Encrypted Standard Verification Gateway</span>
        </div>
      </div>
    </div>
  );
};

// Layout global constant theme styles 
const containerStyle = { padding: '80px 20px', fontFamily: '"Poppins", sans-serif', textAlign: 'center', backgroundColor: '#f6f5f0', minHeight: '100vh', boxSizing: 'border-box' };
const titleStyle = { fontFamily: '"Cinzel Decorative", serif', color: '#1b2e1e', fontSize: '24px', fontWeight: '700', margin: '0 0 6px 0' };
const subTitleStyle = { fontFamily: '"Poppins", sans-serif', fontSize: '13px', color: '#82927e', margin: '0 0 28px 0', lineHeight: '1.5' };
const amountCardStyle = { backgroundColor: '#fbfcfb', padding: '18px', borderRadius: '14px', marginBottom: '28px', border: '1px dashed rgba(46, 68, 49, 0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center' };
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '500', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' };
const badgeContainerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '20px', fontSize: '11px', color: '#94a3b8', fontWeight: '500' };
const codAlertCardStyle = { display: 'flex', gap: '14px', alignItems: 'flex-start', backgroundColor: '#e2ece4', border: '1px solid rgba(46, 68, 49, 0.1)', padding: '16px', borderRadius: '12px', marginBottom: '28px' };

export default PaymentPage;