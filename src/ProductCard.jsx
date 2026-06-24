import React from 'react';
import axios from 'axios';

const ProductCard = ({ product }) => {
  
  const handleAddToCart = () => {
    // Exact payload explicitly matching backend properties
    const payload = {
      userId: sessionStorage.getItem("userId") || "user_test_123", 
      productId: product._id || product.id,
      quantity: 1,
      title: product.title,
      price: product.price,
      image: product.image 
    };

    axios.post('http://localhost:3000/cart/add', payload)
      .then((response) => {
        alert(product.title + " successfully added to cart! 🛒");
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("Could not add item. Try again!");
      });
  };

  return (
    <div style={cardStyle}>
      {/* Product Image Screen View */}
      <div style={imageContainerStyle}>
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>

      {/* Product Information details */}
      <h3 style={titleStyle}>{product.title}</h3>
      <p style={priceStyle}>Rs. {product.price}</p>
      
      {/* PURE ACTION BUTTON */}
      <button onClick={handleAddToCart} style={buttonStyle}>
        Add to Cart
      </button>
    </div>
  );
};

// --- BASIC STYLING SETUP ---
const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '16px',
  width: '260px',
  textAlign: 'center',
  fontFamily: '"Poppins", sans-serif',
  boxSizing: 'border-box',
  border: '1px solid rgba(42, 54, 38, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
};

const imageContainerStyle = {
  width: '100%',
  height: '240px',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: '#f6f5f0'
};

const titleStyle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#2a3626',
  margin: '8px 0 0 0'
};

const priceStyle = {
  fontSize: '14px',
  color: '#6a7566',
  margin: '0 0 8px 0'
};

const buttonStyle = {
  backgroundColor: '#2a3626',
  color: '#f6f5f0',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '500',
  textTransform: 'uppercase',
  width: '100%'
};

export default ProductCard;