import React, { useState } from 'react'
import axios from 'axios' 

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [toast, setToast] = useState({ show: false, message: "", isSuccess: true }) 
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSubmitting(true)
    axios.post("http://localhost:3000/api/contact", formData)
      .then((res) => {
        setToast({ 
          show: true, 
          message: `Feedback saved & real confirmation has been sent to ${formData.email} 📩`,
          isSuccess: true 
        })
        setFormData({ name: "", email: "", message: "" }) 
      })
      .catch((error) => {
        console.error("Axios Submission Error:", error)
        setToast({ 
          show: true, 
          message: "Could not process request. Check your Node backend status! ⚠️", 
          isSuccess: false 
        })
      })
      .finally(() => {
        setIsSubmitting(false)
        setTimeout(() => setToast({ show: false, message: "", isSuccess: true }), 4000)
      })
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 72px)',
      backgroundColor: '#f6f5f0',
      fontFamily: '"Poppins", sans-serif',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      padding: '60px 20px'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght=0,400;1,400&family=Poppins:wght=300;400;500;600;700&display=swap');
        body { margin: 0; padding: 0; background-color: #f6f5f0; }
        
        .contact-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          z-index: 1;
        }

        .info-block {
          padding: 20px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(42, 54, 38, 0.05);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .info-block:hover {
          transform: translateY(-4px);
          background-color: #ffffff;
          box-shadow: 0 15px 30px rgba(42, 54, 38, 0.05);
          border-color: rgba(42, 54, 38, 0.15);
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid rgba(42, 54, 38, 0.15);
          border-radius: 12px;
          background-color: #ffffff;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          color: #1a1a1a;
          box-sizing: border-box;
          outline: none;
          transition: all 0.3s ease;
        }
        .form-input:focus {
          border-color: #2a3626;
          box-shadow: 0 0 0 3px rgba(42, 54, 38, 0.08);
        }

        .premium-submit-btn {
          width: 100%;
          background-color: #2a3626;
          color: #f6f5f0;
          border: none;
          padding: 14px;
          border-radius: 24px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .premium-submit-btn:hover {
          background-color: #1c251a;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(42, 54, 38, 0.15);
        }

        .leafy-toast {
          position: fixed;
          top: 90px;
          right: 30px;
          padding: 14px 24px;
          border-radius: 12px;
          color: #f7f9f6;
          font-size: 13px;
          font-weight: 500;
          z-index: 2000;
          box-shadow: 0 10px 25px rgba(46, 68, 49, 0.15);
          transform: translateX(160%);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          backdrop-filter: blur(8px);
          max-width: 350px;
          line-height: 1.4;
        }
        .leafy-toast.show {
          transform: translateX(0);
        }
      `}</style>

      <div 
        className={`leafy-toast ${toast.show ? 'show' : ''}`}
        style={{ backgroundColor: toast.isSuccess ? 'rgba(46, 68, 49, 0.95)' : 'rgba(186, 73, 73, 0.95)' }}
      >
        <span>{toast.message}</span>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '600', letterSpacing: '4px', color: '#1a1a1a', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
          LEAFY VIBE
        </h1>
        <div style={{ width: '40px', height: '1.5px', background: '#2a3626', margin: '10px auto' }}></div>
        <span style={{ fontSize: '11px', color: '#768272', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', fontWeight: '400' }}>
          Connect With Us
        </span>
      </div>

      <div className="contact-container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: '24px', color: '#2a3626', margin: '0 0 10px 0', fontWeight: '400', lineHeight: '1.4' }}>
            "We'd love to hear from you."
          </h3>
          <p style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#61695e', lineHeight: '1.7', fontWeight: '300' }}>
            Whether you have a question about our curated botanical collection, need plant styling advice, or just want to say hello, our team is here to guide you.
          </p>

          <div className="info-block" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: '#f1f0ea', padding: '10px', borderRadius: '12px', fontSize: '18px' }}>📍</div>
            <div>
              <h4 style={titleStyle}>Studio Location</h4>
              <p style={textStyle}>Town Hall Road, Madurai,<br />Tamil Nadu, India</p>
            </div>
          </div>

          <div className="info-block" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: '#f1f0ea', padding: '10px', borderRadius: '12px', fontSize: '18px' }}>✉️</div>
            <div>
              <h4 style={titleStyle}>Email Address</h4>
              <p style={textStyle}>hello@leafyvibe.com</p>
            </div>
          </div>

          <div className="info-block" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: '#f1f0ea', padding: '10px', borderRadius: '12px', fontSize: '18px' }}>📞</div>
            <div>
              <h4 style={titleStyle}>Call Support</h4>
              <p style={textStyle}>+91 8778492900</p>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          padding: '40px 30px',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(42, 54, 38, 0.04)',
          border: '1px solid rgba(42, 54, 38, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h4 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#2a3626', fontWeight: '500', letterSpacing: '0.5px' }}>
            Send A Message
          </h4>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name" 
                className="form-input"
                required
              />
            </div>

            <div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address" 
                className="form-input"
                required
              />
            </div>

            <div>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="How can we help you grow?" 
                rows="4"
                className="form-input"
                style={{ resize: 'none' }}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="premium-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message ⚡"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const titleStyle = { margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#2a3626', letterSpacing: '0.5px' }
const textStyle = { margin: 0, fontSize: '12px', color: '#61695e', fontWeight: '400', lineHeight: '1.6' }

export default Contact;