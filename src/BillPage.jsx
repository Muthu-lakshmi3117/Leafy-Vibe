import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const BillPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const billRef = useRef();

  // Upgraded dynamic toast handling structure
  const [toast, setToast] = useState({ show: false, message: "", isSuccess: true });
  
  // Local state to handle dynamic quantity updates
  const [billItems, setBillItems] = useState(location.state?.items || []);
  const addressData = location.state?.address || {};
  const deliveryCharge = 60;

  const showToastMessage = (message, isSuccess = true) => {
    setToast({ show: true, message, isSuccess });
    setTimeout(() => {
      setToast({ show: false, message: "", isSuccess: true });
    }, 3000); 
  };

  // --- FIXED: Quantity Increase/Decrease Handler (1 ku keezha pogaadhu) ---
  const handleQuantityChange = (index, operation) => {
    const updatedItems = [...billItems];
    const currentQty = updatedItems[index].quantity || 1;

    if (operation === 'increase') {
      updatedItems[index].quantity = currentQty + 1;
    } else if (operation === 'decrease') {
      // --- LOCKED AT 1: Remove condition completely canceled ---
      if (currentQty > 1) {
        updatedItems[index].quantity = currentQty - 1;
      } else {
        showToastMessage("Quantity cannot be less than 1! 🌿", false);
      }
    }
    setBillItems(updatedItems);
  };

  // Dynamic Real-time Calculations Based on billItems State
  const subtotal = billItems.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.quantity) || 1)), 0);
  const cgst = Math.round(subtotal * 0.09);
  const sgst = Math.round(subtotal * 0.09);
  const grandTotal = subtotal + cgst + sgst + (subtotal > 0 ? deliveryCharge : 0);

  const handleDownloadPDF = async () => {
    if (billItems.length === 0) {
      showToastMessage("Nothing to export. Summary shelf is empty! ⚠️", false);
      return;
    }
    const element = billRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 190; 
    const pageHeight = 295; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 10; 

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`Leafy_Vibe_Quotation_${Date.now()}.pdf`);
    showToastMessage("Quotation PDF downloaded successfully! 📄", true);
  };

  const handleFinalOrderConfirm = () => {
    if (billItems.length === 0) {
      showToastMessage("Your cart is empty! ⚠️", false);
      return;
    }

    showToastMessage("Order summary confirmed! Opening Payment... 💳🌿", true);
    
    setTimeout(() => {
      navigate('/payment', { 
        state: { 
          items: billItems, 
          address: addressData,
          totalAmount: grandTotal
        } 
      });
    }, 2000);
  };

  return (
    <div style={pageStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap');
        
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

        .qty-control-btn {
          background-color: #fafbfa;
          border: 1px solid #e0e5dd;
          color: #2e4431;
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .qty-control-btn:hover {
          background-color: #2e4431;
          color: #fbf9f6;
          border-color: #2e4431;
        }
      `}</style>

      {/* --- DYNAMIC TRANSITION TOAST CONTROLLER --- */}
      <div className={`leafy-toast ${toast.show ? 'show' : ''} ${toast.isSuccess ? 'toast-success' : 'toast-error'}`}>
        <span>{toast.message}</span>
      </div>

      <div style={billContainerStyle}>
        <div ref={billRef} style={{ backgroundColor: '#ffffff', padding: '15px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontFamily: '"Cinzel Decorative", serif', color: '#1b2e1e', margin: '0 0 5px 0', letterSpacing: '1.5px', fontWeight: '700', fontSize: '22px' }}>leafy vibe</h2>
            <p style={{ fontFamily: '"Poppins", sans-serif', color: '#6a7566', fontSize: '10px', margin: 0, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Order Review & Summary
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: '#fafbfa', padding: '12px', borderRadius: '12px', border: '1px solid #e0e5dd' }}>
            <div style={{ fontSize: '11px', color: '#556050', textAlign: 'left' }}>
              <p style={{ margin: '2px 0' }}><strong>Review ID:</strong> LV-{Math.floor(100000 + Math.random() * 900000)}</p>
              <p style={{ margin: '2px 0' }}><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            </div>
            <div style={{ fontSize: '11px', color: '#556050', textAlign: 'left', borderLeft: '1px solid #e0e5dd', paddingLeft: '10px' }}>
              <p style={{ margin: '2px 0', fontWeight: '600', color: '#1b2e1e' }}>Shipping To:</p>
              <p style={{ margin: '2px 0', textTransform: 'capitalize' }}>{addressData.fullName || 'Customer'}</p>
              <p style={{ margin: '2px 0', color: '#7a8574' }}>{addressData.streetAddress || 'N/A'}, {addressData.city || ''} - {addressData.pincode || ''}</p>
            </div>
          </div>

          <div style={dividerStyle}></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', color: '#2e4431', marginBottom: '12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span style={{ flex: 2, textAlign: 'left' }}>Product Description</span>
            <span style={{ flex: 1.2, textAlign: 'center' }}>Qty Modifier</span>
            <span style={{ flex: 1, textAlign: 'right' }}>Amount</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {billItems.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <span style={{ flex: 2, textTransform: 'capitalize', color: '#4a5347', textAlign: 'left', paddingRight: '5px' }}>{item.title}</span>
                
                {/* Dynamic Quantity Action Block Buttons */}
                <div style={{ flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <button type="button" className="qty-control-btn" onClick={() => handleQuantityChange(index, 'decrease')}>-</button>
                  <span style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: '500', color: '#1b2e1e', minWidth: '15px', textAlign: 'center' }}>
                    {item.quantity || 1}
                  </span>
                  <button type="button" className="qty-control-btn" onClick={() => handleQuantityChange(index, 'increase')}>+</button>
                </div>

                <span style={{ flex: 1, textAlign: 'right', fontWeight: '500', color: '#1b2e1e' }}>
                  ₹{(Number(item.price) || 0) * (Number(item.quantity) || 1)}
                </span>
              </div>
            ))}
          </div>

          <div style={dividerStyle}></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            <div style={summaryRowStyle}><span>Subtotal Basket Amount:</span> <span>₹{subtotal}</span></div>
            <div style={summaryRowStyle}><span>Central Tax CGST (9%):</span> <span>₹{cgst}</span></div>
            <div style={summaryRowStyle}><span>State Tax SGST (9%):</span> <span>₹{sgst}</span></div>
            <div style={summaryRowStyle}><span>Fixed Logistics Delivery:</span> <span>₹{subtotal > 0 ? deliveryCharge : 0}</span></div>
            
            <div style={{ width: '100%', height: '1px', borderBottom: '1px solid #e0e5dd', margin: '5px 0' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '600', color: '#1b2e1e' }}>
              <span>Grand Payable Total:</span> 
              <span style={{ color: '#2e4431' }}>₹{grandTotal}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
          <button onClick={handleFinalOrderConfirm} style={payBtnStyle}>
            💳 Proceed to Payment
          </button>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleDownloadPDF} style={backBtnStyle}>
              📄 Download Summary
            </button>
            <button onClick={() => navigate('/cart')} style={backBtnStyle}>
              Return to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const pageStyle = { padding: '40px 20px', fontFamily: '"Poppins", sans-serif', backgroundColor: '#fbf9f6', minHeight: '100vh', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const billContainerStyle = { backgroundColor: '#ffffff', padding: '30px 22px', borderRadius: '20px', border: '1px solid #e0e5dd', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', width: '100%', maxWidth: '460px', boxSizing: 'border-box' };
const dividerStyle = { width: '100%', height: '1px', borderBottom: '1px dashed #e0e5dd', margin: '15px 0' };
const summaryRowStyle = { display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#556050' };
const backBtnStyle = { backgroundColor: 'transparent', color: '#7a8574', border: '1px solid #e0e5dd', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: '500', fontSize: '12px', width: '100%', fontFamily: '"Poppins", sans-serif', transition: 'all 0.2s ease', textAlign: 'center' };
const payBtnStyle = { backgroundColor: '#2e4431', color: '#fbf9f6', border: 'none', padding: '14px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: '500', fontSize: '13px', width: '100%', fontFamily: '"Poppins", sans-serif', letterSpacing: '0.5px', transition: 'all 0.2s ease' };

export default BillPage;