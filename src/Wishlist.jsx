// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// const Wishlist = () => {
//   const navigate = useNavigate()
//   const [wishlistItems, setWishlistItems] = useState([])

//   useEffect(() => {
//     // --- PROTECTION GUARD: Check if user is logged in ---
//     const savedUser = JSON.parse(localStorage.getItem('loggedInUser'))
    
//     // Login பண்ணாம டைரக்டா /wishlist வரப் பார்த்தா login page-க்கு போயிடும்
//     if (!savedUser) {
//       navigate('/login')
//       return // கீழ இருக்குற விஷ்லிஸ்ட் டேட்டா லோடு லாஜிக் ரன் ஆகாம ஸ்டாப் பண்ணிடும்
//     }

//     // பயனர் லாகின் செய்திருந்தால் மட்டும் Local Storage-ல இருந்து saved items-ஐ எடுக்கிறோம்
//     const savedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || []
//     setWishlistItems(savedWishlist)
//   }, [navigate])

//   const handleSimpleCartClick = (title) => {
//     alert(`${title} added to your cart! 🛒🌿`);
//   }

//   // Wishlist பக்கத்தில் இருந்தே ஐட்டமை நீக்குவதற்கான Logic
//   const handleRemoveFromWishlist = (productId) => {
//     const updatedWishlist = wishlistItems.filter(item => (item._id || item.id) !== productId)
//     setWishlistItems(updatedWishlist)
//     localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist))
//   }

//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       width: '100%',
//       flex: 1,
//       minHeight: 'calc(100vh - 72px)',
//       backgroundColor: '#f6f5f0', // Signature light ivory slate
//       fontFamily: '"Poppins", sans-serif',
//       boxSizing: 'border-box',
//       padding: '60px 40px',
//       margin: 0
//     }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
//         body { margin: 0; padding: 0; background-color: #f6f5f0; }
        
//         .wishlist-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//           gap: 35px;
//           width: 100%;
//           max-width: 1200px;
//           margin: 0 auto;
//         }
        
//         .luxury-wish-card {
//           background-color: rgba(255, 255, 255, 0.7);
//           backdrop-filter: blur(5px);
//           padding: 20px;
//           border: 1px solid rgba(42, 54, 38, 0.05);
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
//         }

//         .luxury-wish-card:hover {
//           transform: translateY(-8px);
//           background-color: #ffffff;
//           box-shadow: 0 20px 40px rgba(42, 54, 38, 0.05);
//         }

//         .remove-heart-btn {
//           background: none;
//           border: none;
//           cursor: pointer;
//           font-size: 18px;
//           padding: 0;
//           transition: transform 0.2s;
//         }
//         .remove-heart-btn:hover {
//           transform: scale(1.2);
//         }

//         .premium-cart-btn {
//           background-color: transparent;
//           border: 1px solid #2a3626;
//           padding: 8px 18px;
//           font-size: 11px;
//           color: #2a3626;
//           font-weight: 500;
//           text-transform: uppercase;
//           letter-spacing: 1px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }
//         .premium-cart-btn:hover {
//           background-color: #2a3626;
//           color: #f6f5f0;
//         }
//       `}</style>

//       {/* --- TITLE HEADER (Solid Minimal Matte Black Style) --- */}
//       <div style={{ textAlign: 'center', marginBottom: '50px' }}>
//         <h1 style={{ 
//           fontFamily: '"Poppins", sans-serif', 
//           fontSize: '28px', 
//           fontWeight: '600', 
//           letterSpacing: '3px', 
//           color: '#1a1a1a', // Pure aesthetic solid matte black to match other pages
//           margin: '0 0 8px 0',
//           textTransform: 'uppercase'
//         }}>
//           MY WISHLIST
//         </h1>
//         <div style={{ width: '30px', height: '1px', background: '#1a1a1a', margin: '10px auto' }}></div>
//         <span style={{ fontSize: '10px', color: '#768272', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', fontWeight: '400' }}>
//           Your Curated Botanical Favorites
//         </span>
//       </div>

//       {/* --- MAIN WISHLIST AREA --- */}
//       <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', flex: 1 }}>
        
//         {wishlistItems.length === 0 ? (
//           <div style={{ textAlign: 'center', marginTop: '80px' }}>
//             <p style={{ color: '#768272', fontSize: '13px', fontStyle: 'italic', marginBottom: '20px' }}>
//               Your wishlist is empty. Explore our collection to add your favorite blooms! 🌿🤍
//             </p>
//           </div>
//         ) : (
//           <div className="wishlist-grid">
//             {wishlistItems.map((item, index) => {
//               const itemId = item._id || item.id;
              
//               return (
//                 <div key={index} className="luxury-wish-card">
//                   <div>
//                     {/* Product Image Thumbnail */}
//                     <div style={{
//                       width: '100%',
//                       height: '240px',
//                       backgroundColor: '#f1f0ea',
//                       overflow: 'hidden',
//                       marginBottom: '18px',
//                       display: 'flex',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       fontSize: '36px'
//                     }}>
//                       {item.image ? (
//                         <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                       ) : "🌿"}
//                     </div>

//                     {/* Category & Remove Action (Red Heart) */}
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
//                       <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '2px', color: '#768272', fontWeight: '500' }}>
//                         {item.category}
//                       </span>
//                       <button 
//                         onClick={() => handleRemoveFromWishlist(itemId)} 
//                         className="remove-heart-btn"
//                         title="Remove from Wishlist"
//                       >
//                         ❤️
//                       </button>
//                     </div>

//                     {/* Plant Title */}
//                     <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontFamily: '"Playfair Display", serif', color: '#2a3626', fontWeight: '500' }}>
//                       {item.title}
//                     </h4>

//                     {/* Plant Description */}
//                     <p style={{ margin: '0', fontSize: '12px', color: '#61695e', lineHeight: '1.6', fontWeight: '300' }}>
//                       {item.description || "Fresh premium botanical asset directly sourced for your space."}
//                     </p>
//                   </div>

//                   {/* Pricing & Cart Action Footer */}
//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', borderTop: '1px solid rgba(42, 54, 38, 0.06)', paddingTop: '16px' }}>
//                     <span style={{ fontSize: '15px', fontWeight: '500', color: '#2a3626' }}>
//                       Rs. {item.price}
//                     </span>
                    
//                     <button 
//                       onClick={() => handleSimpleCartClick(item.title)} 
//                       className="premium-cart-btn"
//                     >
//                       Add to Cart 🛒
//                     </button>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Wishlist