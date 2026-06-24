import React, { useState } from 'react'
import axios from 'axios'

const Products = () => {
  const [plant, setPlant] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    description: ""
  })

  const handleChange = (e) => {
    setPlant({ ...plant, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!plant.title || !plant.price || !plant.category) {
      alert("Please fill required fields! 🌿")
      return
    }

    // Direct POST request to server
    axios.post("http://localhost:3000/products", plant)
      .then((res) => {
        alert(res.data) // Server message clear alert
        setPlant({ title: "", price: "", category: "", image: "", description: "" }) // Form reset
      })
      .catch((error) => {
        console.error("Error adding product:", error)
        alert("Failed to add product.")
      })
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#fbf9f6',
      fontFamily: '"Poppins", sans-serif',
      boxSizing: 'border-box',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Poppins:wght@300;400;500&display=swap');
        body { margin: 0; background-color: #fbf9f6; }
        .plant-input::placeholder { color: #c2c9bc; font-size: 12px; }
      `}</style>

      {/* --- CENTRAL ADD PRODUCT FORM CARD --- */}
      <div style={{
        width: '100%',
        maxWidth: '320px', 
        backgroundColor: '#ffffff',
        padding: '35px 25px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
        boxSizing: 'border-box'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h2 style={{ 
            fontFamily: '"Cinzel Decorative", serif', 
            fontSize: '18px', 
            fontWeight: '400',
            letterSpacing: '2px',
            color: '#222d1f', 
            margin: '0 0 5px 0' 
          }}>
            ROSE & LILY
          </h2>
          <span style={{ fontSize: '9px', color: '#7a8574', letterSpacing: '1px', textTransform: 'uppercase', display: 'block' }}>
            Add New Inventory
          </span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Plant / Flower Name *</label>
            <input type="text" name="title" placeholder="White Lilies" value={plant.title} onChange={handleChange} style={inputStyle} className="plant-input" />
          </div>
          
          <div>
            <label style={labelStyle}>Price (INR) *</label>
            <input type="number" name="price" placeholder="450" value={plant.price} onChange={handleChange} style={inputStyle} className="plant-input" />
          </div>
          
          <div>
            <label style={labelStyle}>Category *</label>
            <input type="text" name="category" placeholder="Indoor / Lilies" value={plant.category} onChange={handleChange} style={inputStyle} className="plant-input" />
          </div>
          
          <div>
            <label style={labelStyle}>Image URL</label>
            <input type="text" name="image" placeholder="https://image-link.jpg" value={plant.image} onChange={handleChange} style={inputStyle} className="plant-input" />
          </div>
          
          <div>
            <label style={labelStyle}>Description</label>
            <textarea name="description" placeholder="Short description..." value={plant.description} onChange={handleChange} style={{ ...inputStyle, height: '60px', resize: 'none' }} className="plant-input" />
          </div>
          
          <button type="submit" style={{
            backgroundColor: '#32412e',
            color: '#fbf9f6',
            border: 'none',
            padding: '13px',
            borderRadius: '10px',
            fontFamily: '"Poppins", sans-serif',
            fontWeight: '500',
            fontSize: '13px',
            cursor: 'pointer',
            letterSpacing: '0.5px',
            marginTop: '5px'
          }}>
            Insert Product Item 🌿
          </button>
        </form>

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

export default Products;