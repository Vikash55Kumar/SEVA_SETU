import React from 'react'
import { Line } from 'react-chartjs-2';
import "./LinearTotal.css"

export default function LinearTotal({labels=[], labelsName, data = [], title2}) {

    const lineData = {
        // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        labels: labels,

        datasets: [
          {
            // label: 'Certificates Issued',
            label: labelsName,
            // data: [10000, 7650, 3450, 9430, 5540],
            data: data,

            borderColor: 'rgba(0, 123, 255, 1)', 
            backgroundColor: 'rgba(0, 123, 255, 0.2)', 
            borderWidth: 2,
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointHoverBorderColor: 'rgba(255, 99, 132, )',
            pointRadius: 8,
            fill: true,
          },
        ],
      };
      
  return (
    <div>
        <section className="overview">
            <h2 className="overview-title">Monthly Overview</h2>
            <p className="overview-description" style={{textAlign:"center"}}>
                Certificate issuance status across {title2}.
            </p>
            <div className="chart-container">
                <Line
                data={lineData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                    duration: 1000,
                    easing: 'easeInOutQuad',
                    },
                    scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                        display: true,
                        color: '#e5e5e5',
                        },
                    },
                    x: {
                        grid: {
                        display: false,
                        },
                    },
                    },
                    plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                        boxWidth: 10,
                        padding: 15,
                        color: '#333',
                        font: {
                            size: 14,
                            family: 'Arial, sans-serif',
                        },
                        },
                    },
                    },
                }}
                />
            </div>
        </section>
    </div>
  )
}
