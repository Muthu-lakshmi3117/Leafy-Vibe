import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState({ show: false, message: "", isSuccess: true })
  
  const navigate = useNavigate()
  const categories = ["All", "Indoor", "Outdoor", "Seeds", "Garden Decor"]

  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:3000/products")
      .then((res) => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching products:", error)
        setErr("Could not load products. Please check your backend database server.")
        setLoading(false)
      })
  }, [])
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter(item => item.category?.toLowerCase() === selectedCategory.toLowerCase())
  }, [products, selectedCategory])

  const showToastMessage = (message, isSuccess = true) => {
    setToast({ show: true, message, isSuccess });
    setTimeout(() => {
      setToast({ show: false, message: "", isSuccess: true });
    }, 2500); 
  };

  const handleAddToCart = (item, redirectToCheckout = false) => {
    const savedUserId = sessionStorage.getItem("userId") 

    if (!savedUserId) {
      showToastMessage("Please login first to process this item! 🔐", false);
      setTimeout(() => navigate("/login"), 2000); 
      return 
    }

    const payload = {
      userId: savedUserId,
      productId: item._id || item.id,
      title: item.title,   
      price: item.price,   
      image: item.image,   
      quantity: 1,
      isDirectCheckout: redirectToCheckout 
    }

    axios.post("http://localhost:3000/cart/add", payload)
      .then(() => {
        let currentCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        currentCart.push(payload);
        sessionStorage.setItem("cart", JSON.stringify(currentCart));
        window.dispatchEvent(new Event('cartUpdated'));

        if (redirectToCheckout) {
          showToastMessage("Processing Buy Now! Redirecting... ⚡🏡", true);
          setTimeout(() => {
            navigate("/address", { state: { items: [payload] } }); 
          }, 1000);
        } else {
          showToastMessage(`${item.title} added to cart! 🛒`, true);
        }
      })
      .catch((error) => {
        console.error("Backend Error Details:", error)
        showToastMessage("Could not process item. Try again! ⚠️", false)
      })
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: 'calc(100vh - 72px)',
      backgroundColor: '#f6f5f0',
      fontFamily: '"Poppins", sans-serif',
      boxSizing: 'border-box',
      padding: '60px 20px',
      margin: 0,
      position: 'relative'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body { margin: 0; padding: 0; background-color: #f6f5f0; }
        
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
          transform: translateX(150%);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          backdrop-filter: blur(8px);
        }
        .leafy-toast.show {
          transform: translateX(0);
        }

        .category-tab {
          background: transparent;
          border: none;
          color: #768272;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 8px 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        .category-tab:hover, .category-tab.active {
          color: #1a1a1a;
          font-weight: 600;
        }
        .category-tab.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 16px;
          right: 16px;
          height: 2px;
          background-color: #2a3626;
        }

        .shop-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 35px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .luxury-shop-card {
          background-color: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(5px);
          padding: 20px;
          border: 1px solid rgba(42, 54, 38, 0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 16px;
        }
        .luxury-shop-card:hover {
          transform: translateY(-8px);
          background-color: #ffffff;
          box-shadow: 0 20px 40px rgba(42, 54, 38, 0.08);
        }

        .action-button-group {
          display: flex;
          gap: 10px;
          width: 100%;
          margin-top: 24px;
          border-top: 1px solid rgba(42, 54, 38, 0.06);
          padding-top: 16px;
        }

        .premium-cart-btn, .premium-buy-btn {
          flex: 1;
          padding: 12px 14px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 24px;
          white-space: nowrap;
          text-align: center;
        }

        .premium-cart-btn {
          background-color: transparent;
          border: 1px solid #2a3626;
          color: #2a3626;
        }
        .premium-cart-btn:hover {
          background-color: #2a3626;
          color: #f6f5f0;
        }

        .premium-buy-btn {
          background-color: #2a3626;
          border: 1px solid #2a3626;
          color: #f6f5f0;
        }
        .premium-buy-btn:hover {
          background-color: #1c251a;
          border-color: #1c251a;
        }

        /* Shimmer Loading Animation */
        .shimmer {
          background: linear-gradient(90deg, #eff1f0 25%, #e2e5e2 50%, #eff1f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div 
        className={`leafy-toast ${toast.show ? 'show' : ''}`}
        style={{ backgroundColor: toast.isSuccess ? 'rgba(46, 68, 49, 0.95)' : 'rgba(179, 93, 93, 0.95)' }}
      >
        <span>{toast.message}</span>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '600', 
          letterSpacing: '4px', 
          color: '#1a1a1a', 
          margin: '0 0 8px 0',
          textTransform: 'uppercase'
        }}>
          LEAFY VIBE
        </h1>
        <div style={{ width: '40px', height: '1.5px', background: '#2a3626', margin: '10px auto' }}></div>
        <span style={{ fontSize: '11px', color: '#768272', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', fontWeight: '400' }}>
          Curated Botanical Store
        </span>
      </div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '15px', 
        marginBottom: '40px',
        flexWrap: 'wrap',
        borderBottom: '1px solid rgba(0,0,0,0.04)',
        paddingBottom: '12px'
      }}>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        {err && <p style={{ color: '#733d3d', textAlign: 'center', fontSize: '14px', fontWeight: '500' }}>{err}</p>}

        {loading ? (
          <div className="shop-grid">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="luxury-shop-card" style={{ height: '420px', opacity: 0.7 }}>
                <div className="shimmer" style={{ width: '100%', height: '240px', borderRadius: '12px' }} />
                <div className="shimmer" style={{ width: '40%', height: '12px', marginTop: '15px', borderRadius: '4px' }} />
                <div className="shimmer" style={{ width: '80%', height: '18px', marginTop: '10px', borderRadius: '4px' }} />
                <div className="shimmer" style={{ width: '60%', height: '14px', marginTop: '10px', borderRadius: '4px' }} />
                <div className="shimmer" style={{ width: '30%', height: '20px', marginTop: '20px', borderRadius: '4px' }} />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 && !err ? (
          <p style={{ textAlign: 'center', color: '#768272', fontSize: '14px', fontStyle: 'italic', marginTop: '60px' }}>
            No botanical assets found in "{selectedCategory}" shelf right now. 🌿
          </p>
        ) : (
          <div className="shop-grid">
            {filteredProducts.map((item, index) => (
              <div key={item._id || item.id || index} className="luxury-shop-card">
                <div>
                  <div style={{
                    width: '100%',
                    height: '240px',
                    backgroundColor: '#f1f0ea',
                    overflow: 'hidden',
                    marginBottom: '18px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '40px',
                    borderRadius: '12px',
                    position: 'relative'
                  }}>
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        onError={(e) => { 
                          e.target.style.display = 'none';
                          e.target.parentNode.innerText = "🌿";
                        }} 
                      />
                    ) : "🌿"}
                  </div>

                  <div style={{ marginBottom: '6px' }}>
                    <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '2px', color: '#768272', fontWeight: '600' }}>
                      {item.category}
                    </span>
                  </div>

                  <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#2a3626', fontWeight: '500', letterSpacing: '0.5px' }}>
                    {item.title}
                  </h4>

                  <p style={{ margin: '0', fontSize: '12px', color: '#61695e', lineHeight: '1.6', fontWeight: '300' }}>
                    {item.description || "Fresh premium botanical asset directly sourced for your space."}
                  </p>
                </div>

                <div>
                  <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'flex-start' }}>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#2a3626' }}>
                      Rs. {item.price}
                    </span>
                  </div>
                  
                  <div className="action-button-group">
                    <button 
                      onClick={() => handleAddToCart(item, false)} 
                      className="premium-cart-btn"
                    >
                      Add To Cart 🛒
                    </button>

                    <button 
                      onClick={() => handleAddToCart(item, true)} 
                      className="premium-buy-btn"
                    >
                      Buy Now ⚡
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Shop;