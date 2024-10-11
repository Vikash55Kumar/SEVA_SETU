import React, { useEffect, useState } from 'react';
import './AlertList.css';

// Mock function to simulate receiving alerts
const fetchAlerts = (callback) => {
  setInterval(() => {
    const mockAlert = {
      id: Date.now(),
      subdivision: `Subdivision ${Math.floor(Math.random() * 10) + 1}`,
      message: `High demand detected in Subdivision ${Math.floor(Math.random() * 10) + 1}`,
    };
    callback(mockAlert);
  }, 5000); // Fetch a new alert every 5 seconds
};

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const handleNewAlert = (alert) => {
      setAlerts((prevAlerts) => [alert, ...prevAlerts].slice(0, 5)); // Keep only the last 5 alerts
    };

    fetchAlerts(handleNewAlert);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="alert-list">
      <h3>Recent Alerts</h3>
      <ul>
        {alerts.map((alert) => (
          <li key={alert.id} className="alert-item">
            <strong>{alert.subdivision}</strong>: {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertList;
