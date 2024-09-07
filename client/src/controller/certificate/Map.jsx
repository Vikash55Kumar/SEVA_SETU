import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './Map.css';

const data = [
  { name: 'Cast Certificate', formsReceived: 4200, pendingForms: 2240, processedForms: 2879,  recjectedForms: 81 },
  { name: 'Income Certificate', formsReceived: 7800, pendingForms: 4200, processedForms: 3579,  recjectedForms: 1021 },
  { name: 'Birth Certificate', formsReceived: 7000, pendingForms: 5150, processedForms: 3439 ,  recjectedForms: 411},
  { name: 'Residential Certificate', formsReceived: 6300, pendingForms: 5060, processedForms: 1423 ,  recjectedForms: 234},
];

const chartOptions = {
  scales: {
    y: {
      title: {
        display: true,
        text: 'No. of Forms Received', // Y-axis label
        font: {
          size: 22, // Increases the font size of the x-axis label
        },
      },
      beginAtZero: true, // Ensures the y-axis starts at 0
    },
  },
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Map = () => {
  return (
    <div className="dashboard-container">
      <div className="chart-section">
        <h3>Different Types of Form Recieved</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} options={chartOptions}>
            <XAxis dataKey="name" />
             {/* Y-Axis */}
             <YAxis
              tick={{ fontSize: 10 }} // Increase Y-axis tick font size
              label={{ value: 'No. of Forms Received', angle: -90, position: 'Left', fontSize: 18, dx: -22,}} // Label for Y-axis
            />

            <Tooltip />
            <Legend />
            <Bar dataKey="formsReceived" fill="#8884d8" />
            <Bar dataKey="pendingForms" fill="#ffc658" />
            <Bar dataKey="processedForms" fill="#82ca9d" />
            <Bar dataKey="recjectedForms" fill="red" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h3>Different Types of Forms</h3>
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={data}
              dataKey="formsReceived"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={200}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <br/><br/>
    </div>
  );
};

export default Map;
