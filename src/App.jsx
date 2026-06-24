import { useState } from 'react'
import './App.css'
import Register from './Register'
import Login from './Login'
import About from './About'
import Contact from './Contact'
import Shop from './Shop' 
import Navbar from './Navbar' 
import Home from './Home' 
import { Route, Routes } from 'react-router-dom' 
import Products from "./Products"
import ProfilePage from './ProfilePage' // FIXED: ProfilePage import correct-ah iruka-nu check pannikonga
import ProductCard from './ProductCard'
import CartPage from './CartPage'
import BillPage from './BillPage'
import AddressForm from './AddressForm'
import PaymentPage from './PaymentPage'
import OrderSuccess from './OrderSuccess'
import Orders from './Orders'
import CancelledOrders from './CancelledOrders'
import Footer from './Footer'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', backgroundColor: '#fbf9f6' }}>
      <Navbar /> 

      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/products' element={<Shop/>}/> 
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path="/address" element={<AddressForm/>} />
          <Route path="/bill" element={<BillPage/>} />
          <Route path="/payment" element={<PaymentPage/>} />
          <Route path="/order-success" element={<OrderSuccess/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/cancelled-orders" element={<CancelledOrders/>} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes> 
        <Footer/>
        {/* <Products/> */}
      </div>
    </div>
  )
}

export default App;