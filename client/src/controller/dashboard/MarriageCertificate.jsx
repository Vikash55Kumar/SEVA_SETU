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
// import SpinnerLoader from "../../utility/SpinnerLoader";
// import { useLocation } from "react-router-dom";

// const socket = io(`${import.meta.env.VITE_SOCKET_URL}`);

// const MetricCard = ({ title, value }) => (
//   <div className="metric-card">
//     <h3>{title}</h3>
//     <p>{value}</p>
//   </div>
// );


// export default function MerriageCertificate({adminProfile = {}}) {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);

//   const { provider } = adminProfile || {}; 

//   const location = useLocation();
//   const title2 = location.state?.title;
//   const stateTitle = location.state?.stateTitle;
  
//   const totalForms = 2389;
//   const pendingForms = 349;
//   const processedForms = 1897;
//   const rejectedForms = 143;

//   const [formStats, setFormStats] = useState({
//     totalForms: totalForms,
//     pendingForms: pendingForms,
//     processedForms: processedForms,
//     rejectedForms: rejectedForms,
//   });

//   const title = "Forms Monitoring Dashboard Merriage Certificate"

//   const formTitle = "Merriage Certificate"

//   //Linear Total
//   const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May']

//   const labelsName = 'Merriage Certificate Issued'

//   const data = [10000, 7650, 3450, 9430, 5540]

//   const chartData = getChartData(formStats);
//   const chartOptions = getChartOptions();

//   useEffect(() => {
//     // Listen for form statistics updates from the backend
//     socket.on("merrageCertificateUpdate", (data) => {
//       setFormStats({
//         totalForms: data.totalForms,
//         pendingForms: data.pendingForms,
//         processedForms: data.processedForms,
//         rejectedForms: data.rejectedForms,
//       });
//     });

//     // Clean up event listener when component unmounts
//     return () => {
//       socket.off("merrageCertificateUpdate");
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
//       toast.success("Merrage Certificate Report generated successfully!");
//       console.log("Merrage Certificate Report Response:", response);
//     } catch (error) {
//       console.error("Error generating Merrage certificate report:", error);
//       toast.error("Failed to generate Merrage certificate report.");
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
//         <LinearTotal labels={labels} data={data} labelsName={labelsName} title2={title2}/>
//       </section>

//       <br/><br/><br/><br/><br/><br/>
//     </div>
//   )
// }




import React, { useEffect, useState, useCallback, useMemo, memo } from "react";
import { io } from "socket.io-client";
import LinearTotal from "./LinearTotal";
import { getChartOptions } from "../certificate/ChartOption";
import { getChartData } from "../certificate/ChartData";
import { Bar } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { generateReport } from "../../actions/adminAction";
import { DownloadPDF } from "../report/DownloadPdf";
import SpinnerLoader from "../../utility/SpinnerLoader";
import { useLocation } from "react-router-dom";
import Chart from "react-apexcharts";

const socket = io(`${import.meta.env.VITE_SOCKET_URL}`);

const MetricCard = memo(({ title, value }) => (
  <div className="metric-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
));

export default function MarriageCertificate({ adminProfile = {} }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { provider } = adminProfile || {};

  const stateTitle = location.state?.stateTitle || "Default State";
  const title2 = location.state?.title || "Default District";

  const initialStats = useMemo(() => ({
    totalForms: 2389,
    pendingForms: 349,
    processedForms: 1897,
    rejectedForms: 143,
  }), []);

  const [formStats, setFormStats] = useState(initialStats);

  const chartData = useMemo(() => getChartData(formStats));
  const chartOptions = useMemo(() => getChartOptions);

  useEffect(() => {
    const updateStats = (data) => {
      setFormStats({
        totalForms: data.totalForms,
        pendingForms: data.pendingForms,
        processedForms: data.processedForms,
        rejectedForms: data.rejectedForms,
      });
    };

    socket.on("marriageCertificateUpdate", updateStats);

    return () => {
      socket.off("marriageCertificateUpdate", updateStats);
    };
  }, []);

  const handleGenerateReport = useCallback(async () => {
    const reportData = {
      formTitle: "Marriage Certificate",
      state: stateTitle,
      district: title2,
      ...formStats,
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      data: [10000, 7650, 3450, 9430, 5540],
    };

    try {
      await dispatch(generateReport(reportData));
      toast.success("Marriage Certificate Report generated successfully!");
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Failed to generate report.");
    }
  }, [dispatch, formStats, stateTitle, title2]);

  const handleDownloadPDF = useCallback(async () => {
    setLoading(true);
    try {
      await DownloadPDF("Marriage Certificate");
      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Failed to download report.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="report">
      <h1 style={{fontSize:"2rem", margin:"1rem"}}>Revenue Department {stateTitle}</h1>
      <div className="dashboard">
        <h2 style={{fontSize:"2rem", textAlign:"center", margin:"1rem"}}>Forms Monitoring Dashboard - Marriage Certificate</h2>
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
              <br /><br />
              {loading ? <SpinnerLoader /> : (
                <button type="button" className="btn btn-success" onClick={handleDownloadPDF}>
                  Download Report
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <section className="overview">
        <LinearTotal labels={['Jan', 'Feb', 'Mar', 'Apr', 'May']} data={[10000, 7650, 3450, 9430, 5540]} labelsName="Marriage Certificate Issued" title2={title2} />
      </section>
    </div>
  );
};
