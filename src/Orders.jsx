import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", isSuccess: true });
  const [confirmModal, setConfirmModal] = useState({ show: false, orderId: null });
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    fetchOrders();
  }, [userId]);

  const showToastMessage = (message, isSuccess = true) => {
    setToast({ show: true, message, isSuccess });
    setTimeout(() => {
      setToast({ show: false, message: "", isSuccess: true });
    }, 3000); 
  };

  const fetchOrders = () => {
    setLoading(true);
    setError(null);
    
    fetch(`http://localhost:3000/api/orders?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Database response not OK');
      }
      return response.json();
    })
    .then((data) => {
      setOrders(data); 
      setLoading(false);
    })
    .catch((err) => {
      console.error("Database Fetch Error:", err);
      setError("Unga order history-ah load panna mudiyala.");
      setLoading(false);
    });
  };

  const triggerCancelProcess = (orderId) => {
    setConfirmModal({ show: true, orderId });
  };

  const handleCancelOrder = () => {
    const orderId = confirmModal.orderId;
    if (!orderId) return;

    setConfirmModal({ show: false, orderId: null });
    setLoading(true);
    
    fetch(`http://localhost:3000/api/orders/${orderId}/cancel`, {
      method: 'PATCH', 
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      if (!response.ok) throw new Error('Failed to cancel');
      showToastMessage("Order successfully cancelled! 🌿", true);
      fetchOrders(); 
    })
    .catch((err) => {
      console.error(err);
      showToastMessage("Order-ah cancel panna mudiyala. ⚠️", false);
      setLoading(false);
    });
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return { backgroundColor: '#e2ece4', color: '#2e4431' };
      case 'shipped': return { backgroundColor: '#edf2f7', color: '#2b6cb0' };
      case 'cancelled': return { backgroundColor: '#fee2e2', color: '#991b1b' };
      default: return { backgroundColor: '#d1fae5', color: '#065f46' };
    }
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
        .order-card { background: #ffffff; border: 1px solid rgba(46, 68, 49, 0.05); border-radius: 16px; padding: 24px; margin-bottom: 24px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01); }
        .products-list-wrapper { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
        .premium-horizontal-item { display: flex; align-items: center; gap: 20px; background-color: #ffffff; border-radius: 12px; }
        .product-card-details { display: flex; flex-direction: column; justify-content: center; gap: 2px; flex-grow: 1; }
        .cancel-btn { background-color: transparent; color: #dc2626; border: 1px solid rgba(220, 38, 38, 0.15); padding: 8px 18px; border-radius: 30px; font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 500; cursor: pointer; transition: all 0.2s ease; }
        .cancel-btn:hover { background-color: #fee2e2; }

        /* Premium Toast CSS animation layout rules setup matching unga cart styles */
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

        /* Minimal confirmation dialog container wrapper view popup custom template */
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.4); display: flex; justify-content: center;
          align-items: center; z-index: 3000; backdrop-filter: blur(4px);
        }
        .modal-box {
          background: #ffffff; padding: 25px; border-radius: 16px; width: 310px;
          text-align: center; font-family: 'Poppins', sans-serif;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .modal-btn-confirm { background: #dc2626; color: white; border: none; padding: 8px 18px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 500; }
        .modal-btn-close { background: #e2e8f0; color: #475569; border: none; padding: 8px 18px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 500; }
      `}</style>

 
      <div className={`leafy-toast ${toast.show ? 'show' : ''}`}
        style={{ backgroundColor: toast.isSuccess ? 'rgba(46, 68, 49, 0.95)' : 'rgba(179, 93, 93, 0.95)' }}>
        <span>{toast.message}</span>
      </div>
      {confirmModal.show && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 style={{ margin: '0 0 10px 0', color: '#1b2e1e', fontSize: '16px' }}>Cancel Order?</h3>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '12px' }}>Are you sure you want to cancel this order history path? 🌿</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="modal-btn-close" onClick={() => setConfirmModal({ show: false, orderId: null })}>Keep Order</button>
              <button className="modal-btn-confirm" onClick={handleCancelOrder}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '35px' }}>
        <h1 style={titleStyle}>My Orders</h1>
        <p style={subTitleStyle}>Track recent purchases and view your plant collection history.</p>
      </div>

      {loading ? (
        <div style={loadingStyle}>Fetching your botanical history...</div>
      ) : error ? (
        <div style={emptyContainerStyle}><p style={{ fontFamily: 'Poppins', color: '#c94a4a' }}>{error}</p></div>
      ) : orders.length === 0 ? (
        <div style={emptyContainerStyle}>
          <p style={{ fontFamily: 'Poppins', color: '#62725e', marginBottom: '20px' }}>You haven't ordered any greens yet!</p>
          <Link to="/products" style={shopBtnStyle}>Explore Shop</Link>
        </div>
      ) : (
        <div style={listStyle}>
          {orders.map((order) => {
            const currentItems = order.items || order.products || [];
            const displayStatus = order.status || 'Processing';

            return (
              <div key={order._id} className="order-card">
                
                <div style={cardHeaderStyle}>
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div>
                      <span style={metaLabelStyle}>ORDER ID</span>
                      <div style={metaValueStyle}>{order._id}</div>
                    </div>
                    <div>
                      <span style={metaLabelStyle}>DATE PLACED</span>
                      <div style={metaValueStyle}>
                        {order.date ? new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recent'}
                      </div>
                    </div>
                  </div>
                  <span style={{ ...statusBadgeBase, ...getStatusStyle(displayStatus) }}>
                    {displayStatus}
                  </span>
                </div>

                <div className="products-list-wrapper">
                  {currentItems.map((item, idx) => {
                    const finalImage = item.image || item.img || item.imageUrl || "https://placehold.co/240x240?text=No+Product+Image";
                    const finalTitle = item.title || item.name || "Plant Item";
                    
                    return (
                      <div key={idx} className="premium-horizontal-item">
                        <div style={{ width: '90px', height: '90px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#f6f5f0', flexShrink: 0 }}>
                          <img 
                            src={finalImage} 
                            alt={finalTitle} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            onError={(e) => { 
                              e.target.onerror = null; 
                              e.target.src = "https://placehold.co/240x240?text=Image+Not+Found"; 
                            }}
                          />
                        </div>
                        
                        <div className="product-card-details">
                          <h3 style={itemNameStyle}>{finalTitle}</h3>
                          <p style={itemQtyStyle}>Quantity: {item.quantity || 1}</p>
                          <span style={itemPriceStyle}>₹{item.price || 0}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={cardFooterContainerStyle}>
                  <div>
                    {displayStatus.toLowerCase() !== 'delivered' && displayStatus.toLowerCase() !== 'cancelled' && (
                      <button className="cancel-btn" onClick={() => triggerCancelProcess(order._id)}>
                        Cancel Order
                      </button>
                    )}
                  </div>
                  <div style={cardFooterStyle}>
                    <span style={totalLabelStyle}>Total Paid:</span>
                    <span style={totalPriceStyle}>₹{order.total || 0}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
const containerStyle = { maxWidth: '850px', margin: '40px auto', padding: '0 20px', minHeight: '75vh' };
const titleStyle = { fontFamily: '"Cinzel Decorative", serif', color: '#1b2e1e', fontSize: '26px', fontWeight: '700', margin: '0 0 4px 0' };
const subTitleStyle = { fontFamily: '"Poppins", sans-serif', color: '#82927e', fontSize: '13px', margin: '0' };
const listStyle = { display: 'flex', flexDirection: 'column' };
const cardHeaderStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9', fontFamily: '"Poppins", sans-serif', flexWrap: 'wrap', gap: '10px' };
const metaLabelStyle = { fontSize: '9px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block' };
const metaValueStyle = { fontSize: '12px', color: '#475569', fontWeight: '500' };
const statusBadgeBase = { fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', padding: '5px 12px', borderRadius: '20px', letterSpacing: '0.3px' };
const itemNameStyle = { fontFamily: '"Poppins", sans-serif', fontSize: '14px', fontWeight: '500', color: '#1b2e1e', margin: '0' };
const itemQtyStyle = { fontFamily: '"Poppins", sans-serif', fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' };
const itemPriceStyle = { fontFamily: '"Poppins", sans-serif', fontSize: '13px', fontWeight: '600', color: '#2e4431', margin: '2px 0 0 0' };
const cardFooterContainerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #f1f5f9', fontFamily: '"Poppins", sans-serif', flexWrap: 'wrap', gap: '10px' };
const cardFooterStyle = { display: 'flex', alignItems: 'center', gap: '8px' };
const totalLabelStyle = { fontSize: '12px', color: '#64748b', fontWeight: '400' };
const totalPriceStyle = { fontSize: '18px', color: '#1b2e1e', fontWeight: '600' };
const loadingStyle = { fontFamily: '"Poppins", sans-serif', color: '#82927e', fontSize: '13px', textAlign: 'center', padding: '60px 0' };
const emptyContainerStyle = { textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: '16px', border: '1px solid rgba(46, 68, 49, 0.05)' };
const shopBtnStyle = { display: 'inline-block', textDecoration: 'none', color: '#f7f9f6', backgroundColor: '#2e4431', padding: '10px 24px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' };

export default Orders;