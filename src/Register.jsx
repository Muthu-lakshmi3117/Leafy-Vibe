import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate();
  
  const [val, setval] = useState({
    name: "",
    dob: "",
    num: "",
    email: "",
    address: "", 
    pincode: "",
    pass: "",
    cp: ""
  })
  const [toast, setToast] = useState({ show: false, message: "", isSuccess: true })

  let chg = (e) => {
    setval({ ...val, [e.target.name]: e.target.value })
  }
  const showToastMessage = (message, isSuccess = true) => {
    setToast({ show: true, message, isSuccess });
    setTimeout(() => {
      setToast({ show: false, message: "", isSuccess: true });
    }, 2000); 
  };

  let give = () => {
    if (!val.name || !val.dob || !val.num || !val.email || !val.address || !val.pincode || !val.pass || !val.cp) {
      showToastMessage("Pls fill all fields to join. 🌿", false);
      return; 
    }
    if (val.pass !== val.cp) {
      showToastMessage("Passwords do not match. ✨", false);
      return; 
    }
    if (val.num.length < 10) {
      showToastMessage("Please enter a valid phone number. 📱", false);
      return;
    }

    axios.post("http://localhost:3000/bio", val)
      .then((res) => {
        showToastMessage("Welcome to leafy vibe! Registered Successfully 🎉", true);
        
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        showToastMessage("Connection error. Try again. ⚙️", false);
      });
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', 
      minHeight: '100vh',      
      backgroundColor: '#fbf9f6', 
      boxSizing: 'border-box',
      position: 'relative'
    }}>
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
          maxWidth: '340px', 
          backgroundColor: '#ffffff',
          padding: '30px 22px', 
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
          fontFamily: '"Poppins", sans-serif',
          boxSizing: 'border-box'
        }}>
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
            }}>Botanical Studio & Space</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            <div>
              <label style={labelStyle}>Full Name</label>
              <input type='text' name='name' placeholder='Elena Gilbert' onChange={chg} style={inputStyle} className="aesthetic-input"/>
            </div>
            
            <div>
              <label style={labelStyle}>Date of Birth</label>
              <input type='date' name='dob' onChange={chg} style={inputStyle}/>
            </div>
            
            <div>
              <label style={labelStyle}>Mobile Number</label>
              <input type='tel' name='num' placeholder='9876543210' onChange={chg} style={inputStyle} className="aesthetic-input"/>
            </div>
            
            <div>
              <label style={labelStyle}>Email Address</label>
              <input type='email' name='email' placeholder='hello@leafyvibe.com' onChange={chg} style={inputStyle} className="aesthetic-input"/>
            </div>
            <div>
              <label style={labelStyle}>Address</label>
              <textarea 
                name='address' 
                placeholder='Enter your full address here...' 
                onChange={chg} 
                className="aesthetic-input"
                style={{
                  ...inputStyle,
                  height: '55px',
                  resize: 'none',
                  padding: '8px 12px'
                }}
              />
            </div>
            <div>
              <label style={labelStyle}>Pincode</label>
              <input 
                type='text' 
                name='pincode' 
                placeholder='600001' 
                onChange={chg} 
                style={inputStyle} 
                className="aesthetic-input"
              />
            </div>
            
            <div>
              <label style={labelStyle}>Password</label>
              <input type='password' name='pass' placeholder='••••••••' onChange={chg} style={inputStyle} className="aesthetic-input"/>
            </div>
            
            <div>
              <label style={labelStyle}>Confirm Password</label>
              <input type='password' name='cp' placeholder='••••••••' onChange={chg} style={inputStyle} className="aesthetic-input"/>
            </div>
            <button onClick={give} style={{ 
              marginTop: '8px', 
              backgroundColor: '#2e4431', 
              color: '#fbf9f6',
              border: 'none',
              padding: '12px',
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
              Register
            </button>
            <div style={{ 
              textAlign: 'center', 
              marginTop: '10px', 
              fontSize: '12px', 
              color: '#7a8574'
            }}>
              Already have an account?{' '}
              <Link to="/login" style={{ 
                color: '#2e4431', 
                fontWeight: '600', 
                textDecoration: 'none' 
              }}>
                Login here
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  marginBottom: '4px',
  fontWeight: '400',
  color: '#556050',
  fontSize: '11px',
  letterSpacing: '0.5px'
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px', 
  boxSizing: 'border-box',
  borderRadius: '10px',
  border: '1px solid #e0e5dd',
  outline: 'none',
  fontSize: '13px',
  fontFamily: '"Poppins", sans-serif',
  color: '#222d1f',
  backgroundColor: '#fafbfa'
}

export default Register;