import React, { useState } from 'react';
import "./Certificate.css";
import SpinnerLoader from '../../utility/SpinnerLoader'; // Importing Spinner
import { useLocation, useNavigate } from 'react-router-dom';

export default function Certificate() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate() 

  const location = useLocation();
  const title = location.state?.title;
  const stateTitle = location.state?.stateTitle;

  const handleNavigation = (e, path, title) => {
    e.preventDefault();
    setLoading(true);    

    setTimeout(() => {
      setLoading(false);  // Hide spinner after delay
      navigate(path, { state: { title, stateTitle } });   // Navigate to the actual path
    }, 1500);  // Adjust delay as needed
  };

  return (
    <>
      {loading && <SpinnerLoader />}  
      <div>
        <h2 style={{fontSize:"2rem", margin:"1rem"}}>Certificate Monitoring {title} </h2>
        <div className="certificate1">
          {/* Replace default href with onClick handler */}
          <div className="card1"><a onClick={(e) => handleNavigation(e, '/dashboard', title, stateTitle)}>Certificate Dashboard</a></div>
          <div className="card1"><a onClick={(e) => handleNavigation(e, '/casteCertificate', title, stateTitle)}>Caste Certificate</a></div>
          <div className="card1"><a onClick={(e) => handleNavigation(e, '/incomeCertificate', title, stateTitle)}>Income Certificate</a></div>
          <div className="card1"><a onClick={(e) => handleNavigation(e, '/residentialCertificate', title, stateTitle)}>Residential Certificate</a></div>
          <div className="card1"><a onClick={(e) => handleNavigation(e, '/rationcardCertificate', title, stateTitle)}>Ration Card</a></div>
          <div className="card1"><a onClick={(e) => handleNavigation(e, '/birthCertificate', title, stateTitle)}>Birth Certificate</a></div>
          <div className="card1"><a onClick={(e) => handleNavigation(e, '/disabilityCertificate', title, stateTitle)}>Disability Certificates</a></div>
          <div className="card1"><a onClick={(e) => handleNavigation(e, '/merriageCertificate', title, stateTitle)}>Merriage Certificates</a></div>
          <div className="card1"><a onClick={(e) => handleNavigation(e, '/seniorcitizenCertificate', title, stateTitle)}>Senior Citizen Certificates</a></div>
          <div className="card1"><a onClick={(e) => handleNavigation(e, '/characterCertificate', title, stateTitle)}>Character Certificates</a></div>
        </div>
      </div>
    </>
  );
}
