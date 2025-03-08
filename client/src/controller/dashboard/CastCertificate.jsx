// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import LinearTotal from "./LinearTotal";
// import { getChartOptions } from "../certificate/ChartOption";
// import { getChartData } from "../certificate/ChartData";
// import { Bar } from "react-chartjs-2";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { generateReport } from "../../actions/adminAction";
// import { DownloadPDF } from "../report/DownloadPdf.js";
// import SpinnerLoader from "../../utility/SpinnerLoader.jsx";
// import { useLocation } from "react-router-dom";


// const socket = io(`${import.meta.env.VITE_SOCKET_URL}`);

// const MetricCard = ({ title, value }) => (
//   <div className="metric-card">
//     <h3>{title}</h3>
//     <p>{value}</p>
//   </div>
// );

// export default function CastCertificate({adminProfile = {}}) {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);

//   const { provider } = adminProfile || {}; 

// console.log(adminProfile);

//   const location = useLocation();
//   const title2 = location.state?.title;
//   const stateTitle = location.state?.stateTitle;

//   const totalForms = 3634;
//   const pendingForms = 1286;
//   const processedForms = 2100;
//   const rejectedForms = 248;

//   const [formStats, setFormStats] = useState({
//     totalForms: totalForms,
//     pendingForms: pendingForms,
//     processedForms: processedForms,
//     rejectedForms: rejectedForms,
//   });

//   const title = "Forms Monitoring Dashboard Caste Certificate";

//   const formTitle = "Caste Certificate";

//   //Linear Total
//   const labels = ["Jan", "Feb", "Mar", "Apr", "May"];

//   const labelsName = "Caste Certificates Issued";

//   const data = [10000, 7650, 3450, 9430, 5540];

//   const chartData = getChartData(formStats);
//   const chartOptions = getChartOptions();

//   useEffect(() => {
//     // Listen for form statistics updates from the backend
//     socket.on("casteCertificateUpdate", (data) => {
//       setFormStats({
//         totalForms: data.totalForms,
//         pendingForms: data.pendingForms,
//         processedForms: data.processedForms,
//         rejectedForms: data.rejectedForms,
//       });
//     });

//     // Clean up event listener when component unmounts
//     return () => {
//       socket.off("casteCertificateUpdate");
//     };
//   }, []);

//   const handleGenerateReport = async () => {
//     const reportData = {
//       formTitle: formTitle,
//       state:stateTitle,
//       district:title2,
//       totalForms: formStats.totalForms,
//       pendingForms: formStats.pendingForms,
//       processedForms: formStats.processedForms,
//       rejectedForms: formStats.rejectedForms,
//       labels: labels,
//       data: data,
//     };

//     try {
//       const response = await dispatch(generateReport(reportData));
//       toast.success("Certificate Report generated successfully!");
//       console.log("Certificate Report Response:", response);
//     } catch (error) {
//       console.error("Error generating certificate report:", error);
//       toast.error("Failed to generate certificate report.");
//     }
//   };

//   // const handleDownloadPDF = async () => {
//   //   DownloadPDF(formTitle)
//   // };

//   const handleDownloadPDF = async () => {

//     setLoading(true); // Start the spinner
//     try {
//       await DownloadPDF(formTitle); // Wait for the PDF to download
//       toast.success("Report downloaded successfully!");
//     } catch (error) {
//       console.error("Error downloading report:", error);
//       toast.error("Failed to download report.");
//     } finally {
//       setLoading(false); // Stop the spinner
//     }
//   };
//   return (
//     <div className="report">
//       <h1>Revenue Depertment {stateTitle}</h1>

//       <div className="dashboard">
//         <h2>{title}</h2>
//         <div className="metrics-container">
//           <div className="metrics-container">
//             <MetricCard title="Total Forms Received" value={formStats.totalForms} />
//             <MetricCard title="Pending Forms" value={formStats.pendingForms} />
//             <MetricCard title="Processed Forms" value={formStats.processedForms} />
//             <MetricCard title="Rejected Forms" value={formStats.rejectedForms} />
//           </div>
//         </div>
//         <div className="chart-container2">
//           <Bar data={chartData} options={chartOptions} />
//           { provider=="Officer" ? 
//           <div className="buttons">
//             <button type="button" className="btn btn-primary" onClick={handleGenerateReport} > 
//               Generate Report
//             </button>
//             <br />
//             <br />
//             {loading ? (
//             <SpinnerLoader />
//             ) : (
//               <button type="button" className="btn btn-success" onClick={handleDownloadPDF}>
//                 Download Report
//               </button>
//             )}
//           </div> : ""}
//         </div>
//       </div>

//       <section className="overview">
//         <LinearTotal labels={labels} data={data} labelsName={labelsName} title2={title2} />
//       </section>

//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//     </div>
//   );
// }









import React, { useEffect, useState, memo } from "react";
import { io } from "socket.io-client";
import { Bar } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import LinearTotal from "./LinearTotal";
import { getChartOptions } from "../certificate/ChartOption";
import { getChartData } from "../certificate/ChartData";
import { generateReport } from "../../actions/adminAction";
import { DownloadPDF } from "../report/DownloadPdf.js";
import SpinnerLoader from "../../utility/SpinnerLoader.jsx";
import Chart from "react-apexcharts";

const socket = io(import.meta.env.VITE_SOCKET_URL);

const MetricCard = React.memo(({ title, value }) => (
  <div className="metric-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
));

export default function CastCertificate({ adminProfile = {} }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { provider } = adminProfile || {};
  const stateTitle = location.state?.stateTitle || "";
  const districtTitle = location.state?.title || "";

  const [loading, setLoading] = useState(false);
  const [formStats, setFormStats] = useState({
    totalForms: 3634,
    pendingForms: 1286,
    processedForms: 2100,
    rejectedForms: 248,
  });

  const title = "Forms Monitoring Dashboard Caste Certificate";
  const formTitle = "Caste Certificate";

  const labels = ["Jan", "Feb", "Mar", "Apr", "May"];
  const data = [10000, 7650, 3450, 9430, 5540];
  const chartData = getChartData(formStats);
  const chartOptions = getChartOptions;

  useEffect(() => {
    const updateFormStats = (data) => {
      setFormStats((prev) => ({ ...prev, ...data }));
    };

    socket.on("casteCertificateUpdate", updateFormStats);

    return () => socket.off("casteCertificateUpdate", updateFormStats);
  }, []);

  const handleGenerateReport = async () => {
    const reportData = {
      formTitle,
      state: stateTitle,
      district: districtTitle,
      ...formStats,
      labels,
      data,
    };

    try {
      await dispatch(generateReport(reportData));
      toast.success("Certificate Report generated successfully!");
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Failed to generate report.");
    }
  };

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      await DownloadPDF(formTitle);
      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Failed to download report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report">
      <h1 style={{fontSize:"2rem", textAlign:"center", margin:"1rem"}}>Revenue Department {stateTitle}</h1>
      <div className="dashboard">
        <h2 style={{fontSize:"2rem", margin:"1rem"}}>{title}</h2>
        <div className="metrics-container">
          {Object.entries(formStats).map(([key, value]) => (
            <MetricCard key={key} title={key.replace(/([A-Z])/g, " $1")} value={value} />
          ))}
        </div>
        <div className="chart-container2">
          {/* <Bar data={chartData} options={chartOptions} /> */}
          <div style={{ width: "100%", maxWidth: "1000px", margin: "0 auto" }}>
            <Chart options={chartOptions} series={chartData} type="bar" width="100%" height={350} />
          </div>
          {provider === "Officer" && (
            <div className="buttons">
              <button className="btn btn-primary" onClick={handleGenerateReport}>Generate Report</button>
              <br /><br />
              {loading ? <SpinnerLoader /> : (
                <button className="btn btn-success" onClick={handleDownloadPDF}>Download Report</button>
              )}
            </div>
          )}
        </div>
      </div>
      <section className="overview">
        <LinearTotal labels={labels} data={data} labelsName="Caste Certificates Issued" title2={districtTitle} />
      </section>
    </div>
  );
}
