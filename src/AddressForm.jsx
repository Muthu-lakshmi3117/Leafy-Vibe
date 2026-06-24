import axios from 'axios';
import React, { useState, useEffect } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom';

const AddressForm = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  // Profile data fetch aahi read-only-ah show panna helper state
  const [profile, setProfile] = useState({
    name: 'Loading...',
    num: 'Loading...',
    pincode: 'Loading...'
  });

  // --- FIXED: Changed state name from streetAddress to address for registration sync ---
  const [address, setAddress] = useState('');

  // --- LEAFY VIBE THEME: Toast Notification Alert State ---
  const [toast, setToast] = useState({ show: false, message: "", isSuccess: true });

  // --- FETCH REGISTERED DETAILS ON MOUNT ---
  useEffect(() => {
    const savedUserId = sessionStorage.getItem("userId");
    
    if (savedUserId) {
      axios.get(`http://localhost:3000/bio/${savedUserId}`)
        .then((response) => {
          if (response.data) {
            // Profile details locked setup
            setProfile({
              name: response.data.name || 'N/A',
              num: response.data.num || 'N/A',
              pincode: response.data.pincode || 'N/A'
            });
            // --- FIXED: Maps exactly to the 'address' field fetched from registration ---
            setAddress(response.data.address || '');
            showToastMessage("Registered profile loaded! 🌿", true);
          }
        })
        .catch((error) => {
          console.error("Error fetching profile address:", error);
          showToastMessage("Could not load saved data. ⚙️", false);
        });
    }
  }, []);

  // --- LEAFY VIBE THEME: Toast Message Helper ---
  const showToastMessage = (message, isSuccess = true) => {
    setToast({ show: true, message, isSuccess });
    setTimeout(() => {
      setToast({ show: false, message: "", isSuccess: true });
    }, 2000); 
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address.trim()) {
      showToastMessage("Address field cannot be empty! ⚠️", false);
      return;
    }

    const savedUserId = sessionStorage.getItem("userId");
    const cartItems = location.state?.items || [];

    const finalAddressRequest = { 
      fullName: profile.name,
      phoneNumber: profile.num,
      streetAddress: address, // Passes the updated/confirmed text forward to the bill
      pincode: profile.pincode,
      userId: savedUserId 
    };

    showToastMessage('Address verified successfully! 🏡', true);

    // Dynamic 1.5s delay layout redirect to BillPage
    setTimeout(() => {
      navigate('/bill', { state: { items: cartItems, address: finalAddressRequest } });
    }, 1500);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', 
      minHeight: '100vh',      
      backgroundColor: '#fbf9f6', 
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      {/* Dynamic CSS for Premium Shaded Toast */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Poppins:wght@300;400;500;600&display=swap');
        body { margin: 0; padding: 0; background-color: #fbf9f6; }
        .aesthetic-input::placeholder { color: #c2c9bc; font-size: 12px; }
        
        .leafy-toast {
          position: fixed;
          top: 40px;
          right: 30px;
          padding: 16px 28px;
          border-radius: 14px;
          color: #1b2e1e;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 0.3px;
          font-family: "Poppins", sans-serif;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 2000;
          box-shadow: 0 15px 35px rgba(46, 68, 49, 0.08);
          transform: translateY(-50px) scale(0.9);
          opacity: 0;
          pointer-events: none;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        
        .leafy-toast.show {
          transform: translateY(0) scale(1);
          opacity: 1;
          pointer-events: auto;
        }

        .leafy-toast.toast-success {
          background-color: rgba(244, 246, 243, 0.9);
          border-left: 5px solid #2e4431;
        }

        .leafy-toast.toast-error {
          background-color: rgba(253, 244, 244, 0.9);
          border-left: 5px solid #b35d5d;
          color: #5c2c2c;
        }
      `}</style>

      {/* PREMIUM DYNAMIC CUSTOM TOAST INJECTOR */}
      <div className={`leafy-toast ${toast.show ? 'show' : ''} ${toast.isSuccess ? 'toast-success' : 'toast-error'}`}>
        <span>{toast.message}</span>
      </div>

      <div style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px', 
        boxSizing: 'border-box'
      }}>

        <div style={{
          width: '90%',
          maxWidth: '360px', 
          backgroundColor: '#ffffff',
          padding: '35px 22px', 
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
          fontFamily: '"Poppins", sans-serif',
          boxSizing: 'border-box'
        }}>
          
          {/* BRAND LOGO */}
          <div style={{ textTransform: 'lowercase', textAlign: 'center', marginBottom: '25px' }}>
            <h1 style={{ 
              fontFamily: '"Cinzel Decorative", serif', 
              fontSize: '24px', 
              fontWeight: '700',
              letterSpacing: '1.5px',
              color: '#1b2e1e',
              margin: '0',
              whiteSpace: 'nowrap'
            }}>
              leafy vibe
            </h1>
            <span style={{
              fontSize: '8.5px',
              letterSpacing: '1.5px',
              color: '#82927e',
              display: 'block',
              marginTop: '4px',
              textTransform: 'uppercase',
              fontWeight: '400'
            }}>Review Shipping Profile</span>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* LOCKED PROFILE INFORMATION CARD PANEL */}
            <div style={{
              backgroundColor: '#fafbfa',
              border: '1px solid #e0e5dd',
              borderRadius: '12px',
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <span style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', color: '#82927e', letterSpacing: '0.5px' }}>
                Account Information
              </span>
              
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: '#7a8574' }}>Receiver Name</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#1b2e1e' }}>{profile.name}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', color: '#7a8574' }}>Contact Number</span>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#1b2e1e' }}>{profile.num}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', color: '#7a8574' }}>Pincode</span>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#1b2e1e' }}>{profile.pincode}</span>
                </div>
              </div>
            </div>

            {/* EDITABLE ADDRESS FIELD BLOCK */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={labelStyle}>Delivery Address</label>
                <span style={{ fontSize: '9.5px', color: '#b35d5d', fontWeight: '500' }}>✏️ Editable</span>
              </div>
              
              <textarea 
                name='address' 
                value={address}
                placeholder='Modify or confirm your dynamic home address...' 
                onChange={(e) => setAddress(e.target.value)} 
                style={{ ...inputStyle, resize: 'none', height: '85px', padding: '10px 12px' }} 
                className="aesthetic-input"
              />
            </div>
            
            {/* Submit Save Button */}
            <button 
              type="submit"
              style={{ 
                marginTop: '6px', 
                backgroundColor: '#2e4431', 
                color: '#fbf9f6',
                border: 'none',
                padding: '13px',
                borderRadius: '10px',
                fontFamily: '"Poppins", sans-serif',
                fontWeight: '500',
                fontSize: '13px',
                cursor: 'pointer',
                letterSpacing: '1px',
                transition: '0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1c2c1e'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#2e4431'}
            >
              Confirm & Proceed to Bill
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontWeight: '500',
  color: '#556050',
  fontSize: '11px',
  letterSpacing: '0.5px'
}

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: '10px',
  border: '1px solid #e0e5dd',
  outline: 'none',
  fontSize: '13px',
  fontFamily: '"Poppins", sans-serif',
  color: '#222d1f',
  backgroundColor: '#fafbfa'
}
 
export default AddressForm;