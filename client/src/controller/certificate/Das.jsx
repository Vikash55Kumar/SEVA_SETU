// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';
// import './das.css';

// const MetricCard = ({ title, value }) => (
//   <div className="metric-card">
//     <h3>{title}</h3>
//     <p>{value}</p>
//   </div>
// );

// const Das = ({ totalForms, pendingForms, processedForms, recjectedForms }) => {
//   const metrics = [
//     { title: 'Total Forms Received', value: totalForms },
//     { title: 'Pending Forms', value: pendingForms },
//     { title: 'Processed Forms', value: processedForms },
//     { title: 'Rejected Forms', value: recjectedForms },
//   ];

//   const chartData = {
//     labels: ['Total Forms', 'Pending Forms', 'Processed Forms', 'recjectedForms'],
//     datasets: [
//       {
//         label: 'Forms Statistics',
//         data: [totalForms, pendingForms, processedForms, recjectedForms],
//         backgroundColor: ['#007bff', '#ffc107', '#28a745', 'red'],
//         borderColor: ['#007bff', '#ffc107', '#28a745', 'red'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Type of Form', // X-axis label
//           font: {
//             size: 22, // Increases the font size of the x-axis label
//           },
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'No. of Forms Received', // Y-axis label
//           font: {
//             size: 22, // Increases the font size of the x-axis label
//           },
//         },
//         beginAtZero: true, // Ensures the y-axis starts at 0
//       },
//     },
//   };

//   return (
//     <div className="dashboard">
//        <h2>Forms Monitoring Dashboard Jodhpur</h2>
//       <div className="metrics-container">
//         {metrics.map((metric, index) => (
//           <MetricCard key={index} title={metric.title} value={metric.value} />
//         ))}
//       </div>
//       <div className="chart-container">
//         <Bar data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// };

// export default Das;




import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import io from 'socket.io-client'; // Import socket.io-client
import './das.css';

const socket = io(`${import.meta.env.VITE_SOCKET_URL}`); // Ensure this is your backend URL

const MetricCard = ({ title, value }) => (
  <div className="metric-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

const Das = () => {
  // State to store form statistics
  const [formStats, setFormStats] = useState({
    totalForms: 15880,
    pendingForms: 6530,
    processedForms: 9700,
    recjectedForms: 1000,
  });

  useEffect(() => {
    // Listen for form statistics updates from the backend
    socket.on('formStatisticsUpdate', (data) => {
      setFormStats({
        totalForms: data.totalForms,
        pendingForms: data.pendingForms,
        processedForms: data.processedForms,
        recjectedForms: data.recjectedForms,
      });
    });

    // Clean up event listener when component unmounts
    return () => {
      socket.off('formStatisticsUpdate');
    };
  }, []);

  const chartData = {
    labels: ['Total Forms', 'Pending Forms', 'Processed Forms', 'Rejected Forms'],
    datasets: [
      {
        label: 'Forms Statistics',
        data: [
          formStats.totalForms,
          formStats.pendingForms,
          formStats.processedForms,
          formStats.recjectedForms,
        ],
        backgroundColor: ['#007bff', '#ffc107', '#28a745', 'red'],
        borderColor: ['#007bff', '#ffc107', '#28a745', 'red'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Type of Form',
          font: { size: 22 },
        },
      },
      y: {
        title: {
          display: true,
          text: 'No. of Forms Received',
          font: { size: 22 },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard">
      <h2>Forms Monitoring Dashboard Jodhpur</h2>
      <div className="metrics-container">
        <MetricCard title="Total Forms Received" value={formStats.totalForms} />
        <MetricCard title="Pending Forms" value={formStats.pendingForms} />
        <MetricCard title="Processed Forms" value={formStats.processedForms} />
        <MetricCard title="Rejected Forms" value={formStats.recjectedForms} />
      </div>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Das;
