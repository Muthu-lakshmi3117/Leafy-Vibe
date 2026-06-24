import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      flex: 1, 
      minHeight: 'calc(100vh - 72px)', 
      backgroundColor: '#fbf9f6', 
      fontFamily: '"Poppins", sans-serif',
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght=0,400;1,700&family=Poppins:wght=300;400;500;600;700&display=swap');
        body { margin: 0; padding: 0; background-color: #fbf9f6; }
        
        .cta-btn:hover {
          background-color: #222d1f !important;
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(50, 65, 46, 0.2) !important;
        }

        .floating-art {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        @media (max-width: 900px) {
          .main-wrapper { flex-direction: column !important; padding: 40px 20px 100px 20px !important; }
          .left-panel { max-width: 100% !important; text-align: center !important; }
          .right-panel { max-width: 100% !important; margin-top: 50px; margin-bottom: 80px; }
          .desc-text { text-align: center !important; }
        }
      `}</style>

      
      <svg className="floating-art" style={{ position: 'absolute', top: '10%', right: '-5%', width: '400px', opacity: 0.03, pointerEvents: 'none' }} viewBox="0 0 24 24" fill="none" stroke="#32412e" strokeWidth="1">
        <path d="M2 22C2 22 6 14 12 14C18 14 22 22 22 22" strokeWidth="1"/>
        <path d="M12 2V14" />
        <path d="M12 4C14 5 18 6 20 8" />
      </svg>

    
      <div className="main-wrapper" style={{
        display: 'flex',
        maxWidth: '1200px',
        width: '100%',
        margin: 'auto',
        padding: '60px 40px 120px 40px', 
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2,
        gap: '40px'
      }}>
        
       
        <div className="left-panel" style={{ flex: 1, maxWidth: '500px', textAlign: 'left' }}>
          <span style={{
            fontSize: '11px',
            letterSpacing: '4px',
            color: '#7a8574',
            textTransform: 'uppercase',
            fontWeight: '600',
            display: 'block',
            marginBottom: '15px'
          }}>
            Boutique Botanical Studio — Est. 2026
          </span>
          
          <h1 style={{ 
            fontFamily: '"Playfair Display", serif', 
            fontSize: '48px', 
            fontWeight: '700', 
            color: '#1a1a1a', 
            margin: '0 0 20px 0',
            lineHeight: '1.1'
          }}>
            Leafy Vibe
          </h1>

          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            fontWeight: '400',
            fontSize: '22px',
            color: '#32412e',
            margin: '0 0 30px 0',
            lineHeight: '1.4'
          }}>
            "Bringing nature's silent poetry into your concrete spaces."
          </h2>

          <div className="desc-text" style={{ 
            color: '#556050', 
            fontSize: '14px', 
            lineHeight: '1.8', 
            fontWeight: '300',
            textAlign: 'justify',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '40px'
          }}>
            <p style={{ margin: 0 }}>
              Welcome to <strong>Leafy Vibe</strong>. Our passion is to bridge the gap between fast-paced urban lifestyles and the grounding essence of the natural world. We believe that adding a plant to a room isn't just a design choice—it's introducing a living soul that breathes tranquility into your home.
            </p>
            <p style={{ margin: 0 }}>
              From hand-picked exotic indoor greens to beautifully curated rare tropical finds, we responsibly source every single leaf and stem to match your space's unique energy.
            </p>
          </div>

          <Link to="/products" style={{ textDecoration: 'none' }}>
            <button className="cta-btn" style={{ 
              backgroundColor: '#32412e', 
              color: '#fbf9f6',
              border: 'none',
              padding: '16px 36px',
              borderRadius: '50px', 
              fontFamily: '"Poppins", sans-serif',
              fontWeight: '500',
              fontSize: '13px',
              cursor: 'pointer',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              boxShadow: '0 10px 20px rgba(50, 65, 46, 0.12)',
              transition: 'all 0.4s ease'
            }}>
              Explore Collection 🌿
            </button>
          </Link>
        </div>

        
        <div className="right-panel" style={{ 
          flex: 1, 
          maxWidth: '550px', 
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          alignItems: 'center',
          width: '100%'
        }}>
          
         
          <div style={{
            gridColumn: '1 / span 10',
            gridRow: '1',
            height: '380px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(50, 65, 46, 0.06)',
            backgroundColor: '#eef2ed'
          }}>
            <img 
              src="https://www.sunset.com/wp-content/uploads/foliage-houseplants-0919-900x500.jpg" 
              alt="Minimalist Studio Vibe" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          
          <div style={{
            gridColumn: '7 / span 6',
            gridRow: '1',
            height: '24px', 
            position: 'relative',
            zIndex: 3
          }}>
            <div style={{
              position: 'absolute',
              bottom: '-190px', 
              right: '0',
              width: '100%',
              height: '240px',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '8px solid #fbf9f6', 
              boxShadow: '0 18px 40px rgba(0,0,0,0.12)', 
              backgroundColor: '#eef2ed'
            }}>
              <img 
                src="https://i.pinimg.com/736x/4b/9a/0c/4b9a0c0e54e8c9d8e730f43ab6248739.jpg" 
                alt="Responsibly Sourced Greens" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default About;