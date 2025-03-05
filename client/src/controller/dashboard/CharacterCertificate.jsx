// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import LinearTotal from "./LinearTotal";
// import { getChartOptions } from "../certificate/ChartOption";
// import { getChartData } from "../certificate/ChartData";
// import { Bar } from "react-chartjs-2";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { generateReport } from "../../actions/adminAction";
// import { DownloadPDF } from "../report/DownloadPdf";
// import { useLocation } from "react-router-dom";

// const socket = io(`${import.meta.env.VITE_SOCKET_URL}`);

// const MetricCard = ({ title, value }) => (
//   <div className="metric-card">
//     <h3>{title}</h3>
//     <p>{value}</p>
//   </div>
// );

// export default function CharacterCertificate({adminProfile = {}}) {

//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);

//   const { provider } = adminProfile || {}; 


//   const location = useLocation();
//   const title2 = location.state?.title || "Default Title";
//   const stateTitle = location.state?.stateTitle || "Default Title";

//   const totalForms = 2133;
//   const pendingForms = 456;
//   const processedForms = 1537;
//   const rejectedForms = 140;

//   const [formStats, setFormStats] = useState({
//     totalForms: totalForms,
//     pendingForms: pendingForms,
//     processedForms: processedForms,
//     rejectedForms: rejectedForms,
//   });

//   const title = "Forms Monitoring Dashboard Characater Certificate"

//   const formTitle = "Character Certificate"

//   //Linear Total
//   const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May']

//   const labelsName = 'Character Certificate Issued'

//   const data = [10000, 7650, 3450, 9430, 5540]

//   const chartData = getChartData(formStats);
//   const chartOptions = getChartOptions();

//   useEffect(() => {
//     // Listen for form statistics updates from the backend
//     socket.on("characterCertificateUpdate", (data) => {
//       setFormStats({
//         totalForms: data.totalForms,
//         pendingForms: data.pendingForms,
//         processedForms: data.processedForms,
//         rejectedForms: data.rejectedForms,
//       });
//     });

//     // Clean up event listener when component unmounts
//     return () => {
//       socket.off("characterCertificateUpdate");
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
//       toast.success("Character Certificate Report generated successfully!");
//       console.log("Character Certificate Report Response:", response);
//     } catch (error) {
//       console.error("Error generating Character certificate report:", error);
//       toast.error("Failed to generate Character certificate report.");
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

//       <h1>Revenue Depertment {stateTitle} </h1>

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
//         <LinearTotal labels={labels} data={data} labelsName={labelsName} title2={title2}/>
//       </section>


//       <br/><br/><br/><br/><br/><br/>
//     </div>
//   )
// }





import React, { useEffect, useState, useMemo, useCallback } from "react";
import { io } from "socket.io-client";
import LinearTotal from "./LinearTotal";
import { getChartOptions } from "../certificate/ChartOption";
import { getChartData } from "../certificate/ChartData";
import { Bar } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { generateReport } from "../../actions/adminAction";
import { DownloadPDF } from "../report/DownloadPdf";
import { useLocation } from "react-router-dom";
import Chart from "react-apexcharts";

const socket = io(`${import.meta.env.VITE_SOCKET_URL}`);

// Memoized MetricCard to prevent unnecessary re-renders
const MetricCard = React.memo(({ title, value }) => (
  <div className="metric-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
));

export default function CharacterCertificate({ adminProfile = {} }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { provider } = adminProfile || {};
  const location = useLocation();
  
  const title2 = location.state?.title || "Default Title";
  const stateTitle = location.state?.stateTitle || "Default Title";

  // Initial form statistics
  const [formStats, setFormStats] = useState({
    totalForms: 2133,
    pendingForms: 456,
    processedForms: 1537,
    rejectedForms: 140,
  });

  const title = "Forms Monitoring Dashboard - Character Certificate";
  const formTitle = "Character Certificate";

  // Chart Labels and Data
  const labels = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May"], []);
  const labelsName = "Character Certificate Issued";
  const data = useMemo(() => [10000, 7650, 3450, 9430, 5540], []);

  // Memoized Chart Data and Options
  const chartData = useMemo(() => getChartData(formStats), [formStats]);
  const chartOptions = useMemo(() => getChartOptions(), []);

  useEffect(() => {
    const handleUpdate = (data) => {
      setFormStats({
        totalForms: data.totalForms,
        pendingForms: data.pendingForms,
        processedForms: data.processedForms,
        rejectedForms: data.rejectedForms,
      });
    };

    socket.on("characterCertificateUpdate", handleUpdate);

    return () => {
      socket.off("characterCertificateUpdate", handleUpdate);
    };
  }, []);

  // Memoized event handlers
  const handleGenerateReport = useCallback(async () => {
    const reportData = {
      formTitle,
      state: stateTitle,
      district: title2,
      ...formStats,
      labels,
      data,
    };

    try {
      await dispatch(generateReport(reportData));
      toast.success("Character Certificate Report generated successfully!");
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Failed to generate Character Certificate report.");
    }
  }, [dispatch, formStats, labels, data, stateTitle, title2]);

  const handleDownloadPDF = useCallback(async () => {
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
  }, [formTitle]);

  return (
    <div className="report">
      <h1 style={{fontSize:"2rem", margin:"1rem"}}>Revenue Department {stateTitle}</h1>

      <div className="dashboard">
        <h2 style={{fontSize:"2rem", margin:"1rem"}}>{title}</h2>
        <div className="metrics-container">
          <MetricCard title="Total Forms Received" value={formStats.totalForms} />
          <MetricCard title="Pending Forms" value={formStats.pendingForms} />
          <MetricCard title="Processed Forms" value={formStats.processedForms} />
          <MetricCard title="Rejected Forms" value={formStats.rejectedForms} />
        </div>

        <div className="chart-container2">
          {/* <Bar data={chartData} options={chartOptions} /> */}
          <div style={{ width: "100%", maxWidth: "1000px", margin: "0 auto" }}>
            <Chart options={chartOptions} series={chartData} type="bar" width="100%" height={350} />
          </div>
          {provider === "Officer" && (
            <div className="buttons">
              <button type="button" className="btn btn-primary" onClick={handleGenerateReport}>
                Generate Report
              </button>
              <br />
              <br />
              {loading ? (
                <SpinnerLoader />
              ) : (
                <button type="button" className="btn btn-success" onClick={handleDownloadPDF}>
                  Download Report
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <section className="overview">
        <LinearTotal labels={labels} data={data} labelsName={labelsName} title2={title2} />
      </section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};
