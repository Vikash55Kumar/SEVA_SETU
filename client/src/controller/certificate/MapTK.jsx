import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import io from "socket.io-client";
import "./Map.css";

// Initialize socket connection
const socket = io(`${import.meta.env.VITE_SOCKET_URL}`); // Adjust this URL to your backend

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const MapTK = ({ formData = [] }) => {
  // State to store form types data (array)
  // console.log(formData.name, formData.FormsReceived, formData.ProcessedForms, formData.rejectedForms);

  const [formTypesData, setFormTypesData] = useState(
    Array.isArray(formData) && formData.length > 0
      ? formData
      : [
          {
            name: formData.name,
            FormsReceived: formData.FormsReceived,
            ProcessedForms: formData.ProcessedForms,
            rejectedForms: formData.rejectedForms,
          },
        ]
  );

  useEffect(() => {
    // Listen for form statistics update (summary)
    socket.on("mapformStatisticsUpdate", (data) => {
      if (Array.isArray(data)) {
        setFormTypesData(data);
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("mapformStatisticsUpdate");
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
              label={{
                value: "No. of Forms Received",
                angle: -90,
                position: "Left",
                fontSize: 18,
                dx: -22,
              }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="FormsReceived" fill="#8884d8" />
            <Bar dataKey="PendingForms" fill="#ffc658" />
            <Bar dataKey="ProcessedForms" fill="#82ca9d" />
            <Bar dataKey="rejectedForms" fill="red" />
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <br />
      <br />
    </div>
  );
};

export default MapTK;
