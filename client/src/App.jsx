import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Correct component names
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './utility/Notification';
import { hideNotification } from './reducer/notificationReducer';
import Navbar from './controller/navbar/Navbar';
import Footer from './controller/footer/Footer';
import HomePage from './controller/homePage/HomePage';
import Login from './controller/user/Login';
import TermService from './controller/term/TermService';
import PrivacyPolicy from './controller/term/PrivacyPolicy';
import Signup from './controller/user/Signup';
import Dashboard from './controller/dashboard/Dashboard';
import Certificate from './controller/certificate/Certificate';
import Contact from './controller/contact/Contact';
import CertificateForm from './controller/certificate/CertificateForm';
import ForgotPassword from './controller/user/ForgotPassword';
import NotFound from './utility/NotFound';
import { getUserDetails, loadUsers } from './actions/userAction';
import GoogleLogin from './utility/GoogleLogin';
import Home from './controller/home/Home';
import Profile from './controller/profile/Profile';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
    dispatch(getUserDetails());
  }, [dispatch]);

  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const { open, message, severity } = useSelector((state) => state.notification);

  const handleClose = () => {
    dispatch(hideNotification());
  };

  console.log('User:', user);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Login />} />
          <Route path='/certificate' element={<Certificate />} />
          <Route path='/certificateForm' element={<CertificateForm />} />
 
          <Route path='/profile' element={
              isAuthenticated 
              ? (loading ? <div>Loading...</div> : user && user.data 
                ? <Profile profile={user.data} />
                  : <div>Profile not found</div>)
              : <HomePage />} 
          />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={!isAuthenticated ? <Login /> : <Home/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/google-login" element={<GoogleLogin />} />
          <Route path='/forgot' element={<ForgotPassword /> } />
          <Route path='/term' element={<TermService />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>

      <Notification open={open} handleClose={handleClose} message={message} severity={severity} />
    </>
  );
}

export default App;
