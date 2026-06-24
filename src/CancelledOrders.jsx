import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CancelledOrders = () => {
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Custom Toast Message State
  const [toast, setToast] = useState({ show: false, message: "", isSuccess: true });
  // Custom Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({ show: false, orderItems: null });

  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    fetchCancelledOrders();
  }, [userId]);

  const showToastMessage = (message, isSuccess = true) => {
    setToast({ show: true, message, isSuccess });
    setTimeout(() => {
      setToast({ show: false, message: "", isSuccess: true });
    }, 3000); 
  };

  const fetchCancelledOrders = () => {
    setLoading(true);
    setError(null);
    axios.get(`http://localhost:3000/api/orders`, { params: { userId } })
    .then((res) => {
      const filtered = res.data.filter(order => order.status?.toLowerCase() === 'cancelled');
      setCancelledOrders(filtered); 
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setError("Failed to load your cancelled orders history.");
      setLoading(false);
    });
  };

  const triggerReorderModal = (orderItems) => {
    setConfirmModal({ show: true, orderItems });
  };

  const handleReorder = () => {
    const orderItems = confirmModal.orderItems;
    if (!userId || !orderItems) return;

    setConfirmModal({ show: false, orderItems: null });
    setLoading(true);

    const reorderPromises = orderItems.map(item => {
      const pId = item.productId || item.id || item._id;
      const title = item.title || "Botanical Plant";
      const image = item.image || item.img || "https://placehold.co/240x240?text=No+Image";
      const price = item.price || 0;
      const qty = item.quantity || 1;

      // --- FIXED: Added isDirectCheckout: true flag to bypass CartPage view ---
      return axios.post(`http://localhost:3000/cart/add`, {
        userId,
        productId: pId,
        title,      
        image,   
        quantity: qty,
        price,
        isDirectCheckout: true // This locks item away from regular cart list view
      });
    });

    Promise.all(reorderPromises)
      .then(() => {
        showToastMessage("Items added! Redirecting to Address Form... 🏡✨", true);
        
        setTimeout(() => {
          navigate('/address', { state: { items: orderItems } });
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        showToastMessage("Reorder process failed. ⚠️", false);
        setLoading(false);
      });
  };

  if (!userId) {
    return (
      <div style={emptyContainerStyle}>
        <h2 style={titleStyle}>Please Login</h2>
        <Link to="/login" style={shopBtnStyle}>Go to Login</Link>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Poppins:wght@300;400;500;600&display=swap');
        body { background-color: #fcfbfa; }
        .order-card { background: #ffffff; border: 1px solid rgba(220, 38, 38, 0.1); border-radius: 16px; padding: 24px; margin-bottom: 24px; }
        .products-list-wrapper { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
        .premium-horizontal-item { display: flex; align-items: center; gap: 20px; }
        .reorder-btn { background-color: #2e4431; color: #f7f9f6; border: none; padding: 8px 22px; border-radius: 30px; font-family: 'Poppins'; font-size: 11px; cursor: pointer; transition: background 0.2s ease; }
        .reorder-btn:hover { background-color: #1c2c1e; }

        .leafy-toast {
          position: fixed;
          top: 90px;
          right: 30px;
          padding: 14px 24px;
          border-radius: 12px;
          color: #f7f9f6;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 2500;
          box-shadow: 0 10px 25px rgba(46, 68, 49, 0.15);
          transform: translateX(120%);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          backdrop-filter: blur(8px);
        }
        .leafy-toast.show {
          transform: translateX(0);
        }

        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.4); display: flex; justify-content: center;
          align-items: center; z-index: 3000; backdrop-filter: blur(4px);
        }
        .modal-box {
          background: #ffffff; padding: 25px; border-radius: 16px; width: 320px;
          text-align: center; font-family: 'Poppins', sans-serif;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .modal-btn-confirm { background: #2e4431; color: white; border: none; padding: 8px 18px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 500; }
        .modal-btn-close { background: #e2e8f0; color: #475569; border: none; padding: 8px 18px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 500; }
      `}</style>

      {/* --- TOAST CONTAINER DISPLAY --- */}
      <div className={`leafy-toast ${toast.show ? 'show' : ''}`}
        style={{ backgroundColor: toast.isSuccess ? 'rgba(46, 68, 49, 0.95)' : 'rgba(179, 93, 93, 0.95)' }}>
        <span>{toast.message}</span>
      </div>

      {/* --- REORDER CONFIRMATION MODAL --- */}
      {confirmModal.show && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 style={{ margin: '0 0 10px 0', color: '#1b2e1e', fontSize: '16px' }}>Reorder Items? 🔄</h3>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '12px' }}>Would you like to add these items back to your cart and set up dynamic shipping? 🌿</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="modal-btn-close" onClick={() => setConfirmModal({ show: false, orderItems: null })}>Cancel</button>
              <button className="modal-btn-confirm" onClick={handleReorder}>Reorder Now</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '35px' }}>
        <h1 style={titleStyle}>Cancelled Purchases</h1>
      </div>

      {loading ? (
        <div style={loadingStyle}>Processing your botanical items...</div>
      ) : error ? (
        <div style={emptyContainerStyle}><p style={{ fontFamily: 'Poppins', color: '#c94a4a' }}>{error}</p></div>
      ) : cancelledOrders.length === 0 ? (
        <div style={emptyContainerStyle}>
          <p style={{ fontFamily: 'Poppins', color: '#62725e' }}>No cancelled orders found! 🌿</p>
        </div>
      ) : (
        <div>
          {cancelledOrders.map((order) => {
            const currentItems = order.items || [];
            return (
              <div key={order._id} className="order-card">
                <div style={cardHeaderStyle}>
                  <div>
                    <span style={metaLabelStyle}>ORDER ID</span>
                    <div style={metaValueStyle}>{order._id}</div>
                  </div>
                  <span style={statusBadgeStyle}>Cancelled</span>
                </div>

                <div className="products-list-wrapper">
                  {currentItems.map((item, idx) => {
                    const cleanImg = item.image || item.img || "https://placehold.co/240x240?text=No+Image";
                    return (
                      <div key={idx} className="premium-horizontal-item">
                        <div style={{ width: '90px', height: '90px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#f6f5f0' }}>
                          <img src={cleanImg} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flexGrow: 1, fontFamily: 'Poppins' }}>
                          <h3 style={itemNameStyle}>{item.title || "Botanical Plant"}</h3>
                          <p style={itemQtyStyle}>Quantity: {item.quantity || 1}</p>
                          <span style={itemPriceStyle}>₹{item.price || 0}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={cardFooterContainerStyle}>
                  <button className="reorder-btn" onClick={() => triggerReorderModal(currentItems)}>Reorder Items 🔄</button>
                  <span style={{ fontFamily: 'Poppins', fontWeight: '600' }}>Total: ₹{order.total || 0}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Styling setup
const containerStyle = { maxWidth: '850px', margin: '40px auto', padding: '0 20px' };
const titleStyle = { fontFamily: '"Cinzel Decorative", serif', color: '#7f1d1d', fontSize: '26px', fontWeight: '700' };
const cardHeaderStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9' };
const metaLabelStyle = { fontSize: '9px', color: '#94a3b8', fontWeight: '600' };
const metaValueStyle = { fontSize: '12px', color: '#475569' };
const statusBadgeStyle = { fontSize: '10px', fontWeight: '600', padding: '5px 12px', borderRadius: '20px', backgroundColor: '#fee2e2', color: '#991b1b' };
const itemNameStyle = { fontFamily: '"Poppins", sans-serif', fontSize: '14px', fontWeight: '500', color: '#1b2e1e', margin: '0' };
const itemQtyStyle = { fontFamily: '"Poppins", sans-serif', fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' };
const itemPriceStyle = { fontFamily: '"Poppins", sans-serif', fontSize: '13px', fontWeight: '600', color: '#2e4431' };
const cardFooterContainerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #f1f5f9' };
const loadingStyle = { fontFamily: '"Poppins", sans-serif', color: '#82927e', textAlign: 'center', padding: '60px 0' };
const emptyContainerStyle = { textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: '16px' };
const shopBtnStyle = { display: 'inline-block', textDecoration: 'none', color: '#f7f9f6', backgroundColor: '#2e4431', padding: '10px 24px', borderRadius: '20px', fontSize: '12px' };

export default CancelledOrders;