import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Correct component names
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
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
import { SocketProvider } from './utility/SocketContext';
import EmployeeProgress from './controller/profile/EmployStatus';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
    dispatch(getUserDetails());
  }, [dispatch]);

  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  return (
    <>
       <ToastContainer 
        position="top-center"  // This will show the toast in the center of the screen
        autoClose={3000}  // Toast will disappear after 4 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <SpinnerLoader /> */}
      <SocketProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Login /> } />
            <Route path='/certificate' element={isAuthenticated ? <Certificate /> : <Login />} />
            <Route path='/certificateForm' element={<CertificateForm />} />
            <Route path='/profile' element={
                isAuthenticated 
                ? (loading ? <div>Loading...</div> : user && user.data 
                  ? <Profile profile={user.data} />
                    : <div>Profile not found</div>)
                : <HomePage />} 
            />
            <Route path='/employProgress' element={isAuthenticated  ? <EmployeeProgress profile={user.data} /> : <Home />} />
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
      </SocketProvider>
    </>
  );
}

export default App;
