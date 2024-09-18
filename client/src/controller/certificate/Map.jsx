
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import io from 'socket.io-client';
import './Map.css';

// Initialize socket connection
const socket = io(`${import.meta.env.VITE_SOCKET_URL}`); // Adjust this URL to your backend

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Map = () => {
  // State to store form types data (array)
  const [formTypesData, setFormTypesData] = useState([
    { name: 'Cast Certificate', FormsReceived: 4200, PendingForms: 2240, ProcessedForms: 2879, RecjectedForms: 81 },
    { name: 'Income Certificate', FormsReceived: 7800, PendingForms: 4200, ProcessedForms: 3579, RecjectedForms: 1021 },
    { name: 'Birth Certificate', FormsReceived: 7000, PendingForms: 5150, ProcessedForms: 3439, RecjectedForms: 411 },
    { name: 'Residential Certificate', FormsReceived: 6300, PendingForms: 5060, ProcessedForms: 1423, RecjectedForms: 234 },
  ]);

  useEffect(() => {
    // Listen for form statistics update (summary)
    socket.on('mapformStatisticsUpdate', (data) => {
      if (Array.isArray(data)) {
        setFormTypesData(data);
      } 
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('mapformStatisticsUpdate');
    };
  }, []);

  return (
    <div className="dashboard-container">

      <div className="chart-section">
        <h3>Different Types of Forms Received</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formTypesData}>
            <XAxis dataKey="name" />
            <YAxis
              tick={{ fontSize: 10 }}
              label={{ value: 'No. of Forms Received', angle: -90, position: 'Left', fontSize: 18, dx: -22 }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="FormsReceived" fill="#8884d8" />
            <Bar dataKey="PendingForms" fill="#ffc658" />
            <Bar dataKey="ProcessedForms" fill="#82ca9d" />
            <Bar dataKey="RecjectedForms" fill="red" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h3>Different Types of Forms (Pie Chart)</h3>
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={formTypesData}
              dataKey="FormsReceived"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={200}
              fill="#8884d8"
              label
            >
              {formTypesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <br /><br />
    </div>
  );
};

export default Map;

