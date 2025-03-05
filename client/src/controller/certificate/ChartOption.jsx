// Register required components in Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// ChartOptions.js
// export const getChartOptions = () => ({
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Type of Form', // X-axis label
//           font: {
//             size: 22, // Font size
//           },
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'No. of Forms Received', // Y-axis label
//           font: {
//             size: 22, // Font size
//           },
//         },
//         beginAtZero: true, // Ensures the y-axis starts at 0
//       },
//     },
//   });

export const getChartOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: {
      categories: ["Total Forms", "Pending Forms", "Processed Forms", "Rejected Forms"],
      labels: { style: { color: '#e5e5e5', fontSize: "14px", family: 'Arial, sans-serif', } },
      title: {
        text: "Types of Form",
        style: { color: '#008FFB', fontSize: "18px"}
      },
    },
    yaxis: { 
      labels: { style: { color: '#e5e5e5', fontSize: "14px" } },
      title: {
        text: "Total Nunmers of Form",
        style: { color: '#008FFB', fontSize: "18px", marginRight:"4rem"}
      },
    },
    grid: { show: true },
  };
  