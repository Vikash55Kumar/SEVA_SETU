import React, { useRef } from 'react';
import "./HomePage.css";

function HomePage() {
  const alerts = [
    { id: 1, message: 'High application load in Subdivision A', link: '/subdivision-a' },
    { id: 2, message: 'New certificate issuance policy update', link: '/policy-update' },
  ];

  const marqueeRef = useRef(null);

  const handleMouseOver = () => {
    if (marqueeRef.current) {
      marqueeRef.current.stop();
    }
  };

  const handleMouseOut = () => {
    if (marqueeRef.current) {
      marqueeRef.current.start();
    }
  };

  return (
    <div className='home'>
      <div className="announcement">
        <div className='latest'>
          <h4>Latest Update</h4>
        </div>
        <div className="marquee-container">
          <marquee ref={marqueeRef} behavior="scroll" direction="left" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h4>
              {alerts.map((alert, index) => (
                <React.Fragment key={alert.id}>
                  <a href={alert.link}>
                    {alert.message}
                  </a>
                  {index < alerts.length - 1 && <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                </React.Fragment>
              ))}
            </h4>
          </marquee>
        </div>
      </div>

      {/* welcome section */}
      <div className="welcomeSection">
        <h1>Welcome to the Certificate Issuance System</h1>
        <p>Our system simplifies and streamlines the certificate 
          issuance process, ensuring efficiency and transparency.
        </p>
      </div>



      {/* Uncomment and add Mapbox if necessary */}
      {/* <section className="interactive-map">
        <h2>Subdivision Status Map</h2>
        <Mapbox />
      </section> */}
    </div>
  );
}

export default HomePage;
