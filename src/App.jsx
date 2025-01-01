import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './Pages/ProtectedRoutes';
import Header from './Components/Header';
import Profile from './Pages/profile';
import Shop from "./Pages/Shop"
import Contact from './Pages/Contact';
import Footer from './Components/Footer';
import ProductDetail from './Pages/Productdetail';
const App = () => {
  return (


    <>

    <Router>
<div className=''>
  <Header/>
</div>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/Footer" element={<Footer/>} />
        <Route path="/Detail/:id" element={<ProductDetail/>} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
