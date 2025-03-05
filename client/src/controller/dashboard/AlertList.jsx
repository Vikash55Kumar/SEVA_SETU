// import React, { useEffect, useState } from 'react';
// import './AlertList.css';


// const subdivisions = ["Caste Certficate", "Income Certificate", "Birth Certificate", "Character Certificate", "Disability Certificate", "Marraiage Certificate", "RationCard Certificate", "Residential Certificate", "SeniorCitizen Certificate"]
// const messageSub = ["Chanakya Puri", "Delhi Cantt", "Vasant Vihar"]

// // Mock function to simulate receiving alerts
// const fetchAlerts = (callback) => {
  
//   setInterval(() => {
//     const randomSubdivision = subdivisions[Math.floor(Math.random() * subdivisions.length)]; // Randomly select a subdivision
//     const randommessageSub = messageSub[Math.floor(Math.random() * messageSub.length)]; // Randomly select a subdivision
//     const mockAlert = {
//       id: Date.now(),
//       subdivision: randomSubdivision,
//       message: `High demand detected in Subdivision ${randommessageSub}`
//     };
//     callback(mockAlert);
//   }, 5000); // Fetch a new alert every 5 seconds
// };

// const AlertList = () => {
//   const [alerts, setAlerts] = useState([]);

//   useEffect(() => {
//     const handleNewAlert = (alert) => {
//       setAlerts((prevAlerts) => [alert, ...prevAlerts].slice(0, 5)); // Keep only the last 5 alerts
//     };

//     fetchAlerts(handleNewAlert);

//     return () => {
//       // Cleanup if needed
//     };
//   }, []);

//   return (
//     <div className="alert-list">
//       <h3>Recent Alerts</h3>
//       <ul>
//         {alerts.map((alert) => (
//           <li key={alert.id} className="alert-item">
//             <strong>{alert.subdivision}</strong>: {alert.message}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AlertList;



import React, { useEffect, useState, useRef, useCallback } from 'react';
import './AlertList.css';

const subdivisions = [
  "Caste Certificate", "Income Certificate", "Birth Certificate", "Character Certificate",
  "Disability Certificate", "Marriage Certificate", "Ration Card Certificate",
  "Residential Certificate", "Senior Citizen Certificate"
];

const messageSub = ["Chanakya Puri", "Delhi Cantt", "Vasant Vihar"];

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);
  const intervalRef = useRef(null); // Store interval reference

  // Function to generate a new alert
  const generateAlert = useCallback(() => {
    const randomSubdivision = subdivisions[Math.floor(Math.random() * subdivisions.length)];
    const randomMessageSub = messageSub[Math.floor(Math.random() * messageSub.length)];

    const newAlert = {
      id: Date.now(),
      subdivision: randomSubdivision,
      message: `High demand detected in Subdivision ${randomMessageSub}`
    };

    setAlerts((prevAlerts) => [newAlert, ...prevAlerts].slice(0, 5)); // Keep the last 5 alerts
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(generateAlert, 5000);

    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, [generateAlert]);

  return (
    <div className="alert-list">
      <h3 style={{fontSize:"1.2rem",}}>Recent Alerts</h3>
      <ul>
        {alerts.map(({ id, subdivision, message }) => (
          <li key={id} className="alert-item">
            <strong>{subdivision}</strong>: {message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertList;
