import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const certificateTypeData = [
  { region: 'State A', casteCertificate: 400, incomeCertificate: 240, birthCertificate: 160 },
  { region: 'State B', casteCertificate: 300, incomeCertificate: 200, birthCertificate: 100 },
  { region: 'State C', casteCertificate: 200, incomeCertificate: 150, birthCertificate: 50 },
  { region: 'State D', casteCertificate: 100, incomeCertificate: 60, birthCertificate: 40 },
];

const CertificateType = () => {
  return (
    <div className="stacked-bar-chart">
      <h3>Certificate Types by Region</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={certificateTypeData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="casteCertificate" stackId="a" fill="#8884d8" />
          <Bar dataKey="incomeCertificate" stackId="a" fill="#82ca9d" />
          <Bar dataKey="birthCertificate" stackId="a" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CertificateType;
