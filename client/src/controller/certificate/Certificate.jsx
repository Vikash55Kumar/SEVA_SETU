import React, { useState } from 'react';
import "./Certificate.css";
import SpinnerLoader from '../../utility/SpinnerLoader'; // Importing Spinner

export default function Certificate() {
  const [loading, setLoading] = useState(false); 

  const handleNavigation = (e, path) => {
    e.preventDefault();
    setLoading(true);    

    setTimeout(() => {
      setLoading(false);  // Hide spinner after delay
      window.location.href = path;  // Navigate to the actual path
    }, 1500);  // Adjust delay as needed
  };

  return (
    <>
      {loading && <SpinnerLoader />}  
      <div>
        <h2>Certificate Apply</h2>
        <div className="certificate">
          {/* Replace default href with onClick handler */}
          <div className="card"><a onClick={(e) => handleNavigation(e, '/dashboard')}>Cast Certificate</a></div>
          <div className="card"><a onClick={(e) => handleNavigation(e, '/dashboard')}>Income Certificate</a></div>
          <div className="card"><a onClick={(e) => handleNavigation(e, '/dashboard')}>Residential Certificate</a></div>
          <div className="card"><a onClick={(e) => handleNavigation(e, '/ration-card')}>Ration Card</a></div>
          <div className="card"><a onClick={(e) => handleNavigation(e, '/dashboard')}>Birth Certificate</a></div>
          <div className="card"><a onClick={(e) => handleNavigation(e, '/disability-certificates')}>Disability Certificates</a></div>
          <div className="card"><a onClick={(e) => handleNavigation(e, '/marriage-certificates')}>Marriage Certificates</a></div>
          <div className="card"><a onClick={(e) => handleNavigation(e, '/senior-citizen-certificates')}>Senior Citizen Certificates</a></div>
          <div className="card"><a onClick={(e) => handleNavigation(e, '/character-certificates')}>Character Certificates</a></div>
        </div>
      </div>
    </>
  );
}
