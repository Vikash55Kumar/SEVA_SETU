import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import './RealTimeStatus.css';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

const RealTimeStatus = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5173');

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setData((prevData) => [...prevData, message.value]);
      setLabels((prevLabels) => [...prevLabels, message.timestamp]);

      // Keep only the last 10 data points
      if (data.length > 10) {
        setData((prevData) => prevData.slice(1));
        setLabels((prevLabels) => prevLabels.slice(1));
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
      setError('Failed to connect to WebSocket server.');
    };

    return () => {
      socket.close();
    };
  }, [data]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Real-Time Data',
        data: data,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true, // Ensure the Filler plugin is used
      },
    ],
  };

  return (
    <div className="real-time-monitoring-container">
      <h2>Real-Time Monitoring</h2>
      <p>Application loads and performance metrics.</p>
      {error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : (
        <div className="chart-container">
          <Line data={chartData} options={{ responsive: true }} />
        </div>
      )}
    </div>
  );
};

export default RealTimeStatus;
