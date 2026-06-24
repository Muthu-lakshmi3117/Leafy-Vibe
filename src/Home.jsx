import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "https://www.ugaoo.com/cdn/shop/articles/shutterstock_1388332676.jpg?v=1746611089&width=1500",
      title: "Bring Nature Indoors",
      subtitle: "Handpicked premium plants to breathe life into your living spaces."
    },
    {
      image: "https://www.ugaoo.com/cdn/shop/articles/shutterstock_1813119916_2e548951-67ac-4f96-a4d8-abf8ddb83c2d.jpg?v=1742047469&width=1500", 
      title: "The Luxe Leafy Vibe",
      subtitle: "Experience the silent poetry of fresh, organic botanical signatures."
    },
    {
      image: "https://static.vecteezy.com/system/resources/thumbnails/035/748/775/small_2x/ai-generated-group-of-young-people-planting-seedlings-in-the-ground-selective-focus-a-group-of-people-plants-seedlings-in-the-ground-in-a-close-up-shot-ai-generated-free-photo.jpg",
      title: "Bespoke Styling",
      subtitle: "Responsible sourcing and expert botanical guidance for modern homes."
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      flex: 1,
      backgroundColor: '#fbf9f6', 
      fontFamily: '"Poppins", sans-serif',
      boxSizing: 'border-box'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght=0,400;1,600&family=Poppins:wght=300;400;500;600;700&display=swap');
        body { margin: 0; background-color: #fbf9f6; overflow-x: hidden; }
        
        /* Smooth Fade & Zoom for Background */
        .hero-bg {
          opacity: 0;
          transform: scale(1.05);
          transition: opacity 1.2s ease-in-out, transform 1.5s ease-in-out;
          position: absolute;
          inset: 0;
        }
        .hero-bg.active {
          opacity: 1;
          transform: scale(1);
        }

        /* Unique Floating Action Button */
        .action-btn {
          background: #32412e;
          color: #fbf9f6;
          border: none;
          padding: 15px 40px;
          border-radius: 12px;
          font-weight: 500;
          font-size: 13px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(50, 65, 46, 0.2);
          transition: all 0.4s ease;
        }
        .action-btn:hover {
          background: #222d1f;
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(50, 65, 46, 0.3);
        }

        /* Modern Navigation Dots */
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .dot.active {
          background: #ffffff;
          width: 30px;
          border-radius: 10px;
        }

        /* Pinterest Interactive Hover Cards */
        .aesthetic-card {
          position: relative;
          height: 400px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(50, 65, 46, 0.05);
          cursor: pointer;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
        }
        
        .aesthetic-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px rgba(50, 65, 46, 0.15);
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .aesthetic-card:hover .card-img {
          transform: scale(1.08);
        }

        /* Clean Slide-Up Gradient Overlay */
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(24, 33, 22, 0.9) 15%, rgba(0, 0, 0, 0.2) 75%);
          display: flex;
          flex-direction: column;
          justifyContent: flex-end;
          padding: 30px;
          box-sizing: border-box;
          opacity: 0;
          transform: translateY(15px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .aesthetic-card:hover .card-overlay {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* --- HERO SECTION: FULL TEXT EXPOSURE (NO CARDS / NO BLUR) --- */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '85vh',
        backgroundColor: '#222d1f',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {slides.map((slide, idx) => (
          <div 
            key={idx} 
            className={`hero-bg ${currentSlide === idx ? 'active' : ''}`}
            style={{
              /* Slightly increased background darkness for crisp white text visibility */
              backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        ))}

        {/* Text Container directly over image (No Box background, layout is naked & raw) */}
        <div style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: '800px',
          width: '90%',
          padding: '20px',
          textAlign: 'center',
          boxSizing: 'border-box',
          color: '#ffffff'
        }}>
          <span style={{ 
            fontSize: '12px', 
            letterSpacing: '6px', 
            textTransform: 'uppercase', 
            color: '#c2d1c0', /* Aesthetic light sage color */
            marginBottom: '18px',
            fontWeight: '500',
            display: 'block'
          }}>
            Exclusive Botanical Curation
          </span>

          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '52px', /* Elevated size for bold raw presence */
            margin: '0 0 20px 0',
            fontWeight: '600',
            lineHeight: '1.2',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)' /* Subtle deep shadow for text separation */
          }}>
            {slides[currentSlide].title}
          </h1>

          <p style={{
            fontSize: '16px',
            margin: '0 0 40px 0',
            fontWeight: '300',
            lineHeight: '1.6',
            color: '#f4f3ef',
            textShadow: '0 1px 5px rgba(0,0,0,0.3)'
          }}>
            {slides[currentSlide].subtitle}
          </p>

          <Link to="/products" style={{ textDecoration: 'none' }}>
            <button className="action-btn">
              Explore Collection 🌿
            </button>
          </Link>
        </div>

        {/* Slider Indicator Dots */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          display: 'flex',
          gap: '12px',
          zIndex: 10
        }}>
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`dot ${currentSlide === idx ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </div>

      {/* --- SECTION 2: INTERACTIVE HOVER IMAGE GRID --- */}
      <div style={{
        maxWidth: '1200px',
        margin: '90px auto 120px auto',
        padding: '0 30px',
        boxSizing: 'border-box',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ 
            fontFamily: '"Playfair Display", serif', 
            fontSize: '32px', 
            color: '#2a3626', 
            margin: '0 0 10px 0',
            fontWeight: '600'
          }}>
            The Botanical Essentials
          </h2>
          <span style={{ fontSize: '12px', color: '#768272', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '500' }}>
            Hover to explore our signature setups
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          width: '100%'
        }}>
          
          {/* Card 1 */}
          <div className="aesthetic-card">
            <img 
              className="card-img" 
              src="https://sharkprintables.com/wp-content/uploads/2024/12/14-Stunning-Indoor-Plants-to-Elevate-Your-Home-Decor.jpg" 
              alt="Exotic Greens" 
            />
            <div className="card-overlay">
              <h3 style={{ margin: '0 0 10px 0', color: '#ffffff', fontFamily: '"Playfair Display", serif', fontSize: '22px' }}>
                Exotic Indoor Greens
              </h3>
              <p style={{ margin: 0, color: '#eef2ed', fontSize: '13px', lineHeight: '1.6', fontWeight: '300' }}>
                Breathe architectural freshness into your luxury layouts with masterfully curated statement foliages.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="aesthetic-card">
            <img 
              className="card-img" 
              src="https://media.istockphoto.com/id/1214705950/photo/abstract-green-leaf-texture-nature-background-tropical-leaf.jpg?b=1&s=170667a&w=0&k=20&c=zpsS2ywymbPof3Spbbev-L50FR2w-gpdLzTLxbdjMIk=" 
              alt="Rare Tropicals" 
            />
            <div className="card-overlay">
              <h3 style={{ margin: '0 0 10px 0', color: '#ffffff', fontFamily: '"Playfair Display", serif', fontSize: '22px' }}>
                Rare Tropical Finds
              </h3>
              <p style={{ margin: 0, color: '#eef2ed', fontSize: '13px', lineHeight: '1.6', fontWeight: '300' }}>
                Hand-picked collector variants and rare tropical aesthetics tailored flawlessly to elevate your space.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="aesthetic-card">
            <img 
              className="card-img" 
              src="https://i.pinimg.com/originals/04/9b/92/049b922916625c026d53f5f3a8dd137c.jpg" 
              alt="Minimalist Pottery" 
            />
            <div className="card-overlay">
              <h3 style={{ margin: '0 0 10px 0', color: '#ffffff', fontFamily: '"Playfair Display", serif', fontSize: '22px' }}>
                Minimalist Pottery
              </h3>
              <p style={{ margin: 0, color: '#eef2ed', fontSize: '13px', lineHeight: '1.6', fontWeight: '300' }}>
                Raw, organic bespoke ceramic installations engineered with a clean, balancing wabi-sabi vibe.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home;