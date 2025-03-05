// import React, { useEffect, useState } from "react";
// import "../certificate/das.css";
// import { io } from "socket.io-client";
// import Map from "../certificate/Map";
// import AlertList from "../dashboard/AlertList";
// import LinearTotal from "./LinearTotal";
// import { getChartOptions } from "../certificate/ChartOption";
// import { getChartData } from "../certificate/ChartData";
// import { Bar } from "react-chartjs-2";
// import { DownloadPDF } from "../report/DownloadPdf";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { useLocation } from "react-router-dom";

// const socket = io(`${import.meta.env.VITE_SOCKET_URL}`);

// const MetricCard = ({ title, value }) => (
//   <div className="metric-card">
//     <h3>{title}</h3>
//     <p>{value}</p>
//   </div>
// );

// export default function Dashboard({adminProfile = {}}) {
//   const location = useLocation();
//   const title2 = location.state?.title || "Jodhpur";
//   const stateTitle = location.state?.stateTitle || "Rajasthan";

//   const { provider } = adminProfile || {}; 

//   const totalForms = 23618;
//   const pendingForms = 7090;
//   const processedForms = 14434;
//   const rejectedForms = 2094;

//   const [formStats, setFormStats] = useState({
//     totalForms: totalForms,
//     pendingForms: pendingForms,
//     processedForms: processedForms,
//     rejectedForms: rejectedForms,
//   });

//   const title = `Forms Monitoring Dashboard ${title2}`;

//   const formTitle = "Type of Certificates";

//   const formTypesData = [
//     { name: 'Cast Certificate', FormsReceived: 3634, pendingForms: 1286, ProcessedForms: 2100, rejectedForms: 248 },
//     { name: 'Income Certificate', FormsReceived: 2374, pendingForms: 587, ProcessedForms: 1700, rejectedForms: 87 },
//     { name: 'Birth Certificate', FormsReceived: 2043, pendingForms: 1235, ProcessedForms: 608, rejectedForms: 200 },
//     { name: 'Residential Certificate', FormsReceived: 3643, pendingForms: 1308, ProcessedForms: 1859, rejectedForms: 476 },
//   ];

//   //Linear Total
//   const labels = ["Jan", "Feb", "Mar", "Apr", "May"];

//   const labelsName = "Certificates Issued";

//   const data = [60000, 47650, 60450, 34030, 65040];

//   const chartData = getChartData(formStats);
//   const chartOptions = getChartOptions();

//   useEffect(() => {
//     // Listen for form statistics updates from the backend
//     socket.on("formStatisticsUpdate", (data) => {
//       setFormStats({
//         totalForms: data.totalForms,
//         pendingForms: data.pendingForms,
//         processedForms: data.processedForms,
//         rejectedForms: data.rejectedForms,
//       });
//     });

//     // Clean up event listener when component unmounts
//     return () => {
//       socket.off("formStatisticsUpdate");
//     };
//   }, []);

//   const handleDownloadPDF = async () => {
//     // DownloadPDF(formTitle)
//     const element = document.querySelector(".das");
//     const canvas = await html2canvas(element, { scale: 3 });
    
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", [210, 600]);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`${formTitle}.pdf`);
//     // Generate base64 data URL
//     const pdfURL = pdf.output("bloburl");
    
//     // Open PDF in a new tab or window
//     window.open(pdfURL);
//   };

//   return (
//     <div className="das">
//       <h1>Revenue Depertment {stateTitle}</h1>

//       <div className="dashboard">
//         <h2>{title}</h2>
//         <div className="metrics-container">
//           <div className="metrics-container">
//             <MetricCard
//               title="Total Forms Received"
//               value={formStats.totalForms}
//             />
//             <MetricCard title="Pending Forms" value={formStats.pendingForms} />
//             <MetricCard
//               title="Processed Forms"
//               value={formStats.processedForms}
//             />
//             <MetricCard
//               title="Rejected Forms"
//               value={formStats.rejectedForms}
//             />
//           </div>
//         </div>
//         <div className="chart-container2">
//           <Bar data={chartData} options={chartOptions} />
//           { provider=="Officer" ? 
//           <div className="buttons">
//             <button type="button" className="btn btn-success" onClick={handleDownloadPDF}>
//               Download Report
//             </button>
//           </div>
//           : ""}
//         </div>
//       </div>

//       <Map
//         formData={formTypesData}
//         // data={districtData}
//         colorScale={["#f0f8ff", "#4682b4"]}
//       />

//       <section className="alerts">
//         <h2>Alerts</h2>
//         <p style={{ textAlign: "center" }}>
//           Alerts for subdivisions with high demand.
//         </p>
//         <AlertList />
//       </section>

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




import React, { useEffect, useState, useMemo, useCallback } from "react";
import "../certificate/das.css";
import { io } from "socket.io-client";
import AlertList from "../dashboard/AlertList";
import LinearTotal from "./LinearTotal";
import { getChartOptions } from "../certificate/ChartOption";
import { getChartData } from "../certificate/ChartData";
import { Bar } from "react-chartjs-2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import Map from "../certificate/Map";
import Chart from "react-apexcharts";

const socket = io(`${import.meta.env.VITE_SOCKET_URL}`);

// Memoized MetricCard to prevent unnecessary re-renders
const MetricCard = React.memo(({ title, value }) => (
  <div className="metric-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
));

export default function Dashboard({ adminProfile = {} }) {
  const location = useLocation();
  const title2 = location.state?.title || "Jodhpur";
  const stateTitle = location.state?.stateTitle || "Rajasthan";

  const { provider } = adminProfile || {};

  const [formStats, setFormStats] = useState({
    totalForms: 23618,
    pendingForms: 7090,
    processedForms: 14434,
    rejectedForms: 2094,
  });

  const title = `Forms Monitoring Dashboard ${title2}`;
  const formTitle = "Type of Certificates";

  const formTypesData = useMemo(
    () => [
      { name: "Cast Certificate", FormsReceived: 3634, pendingForms: 1286, ProcessedForms: 2100, rejectedForms: 248 },
      { name: "Income Certificate", FormsReceived: 2374, pendingForms: 587, ProcessedForms: 1700, rejectedForms: 87 },
      { name: "Birth Certificate", FormsReceived: 2043, pendingForms: 1235, ProcessedForms: 608, rejectedForms: 200 },
      { name: "Residential Certificate", FormsReceived: 3643, pendingForms: 1308, ProcessedForms: 1859, rejectedForms: 476 },
    ],
    []
  );

  // Memoized chart data and options
  // const chartData = useMemo(() => getChartData(formStats), [formStats]);
  // const chartOptions = useMemo(() => getChartOptions(), []);

  const chartData = useMemo(() => getChartData(formStats));
  const chartOptions = useMemo(() => getChartOptions, []);


  useEffect(() => {
    const updateStats = (data) => {
      setFormStats({
        totalForms: data.totalForms,
        pendingForms: data.pendingForms,
        processedForms: data.processedForms,
        rejectedForms: data.rejectedForms,
      });
    };

    socket.on("formStatisticsUpdate", updateStats);
    return () => socket.off("formStatisticsUpdate", updateStats);
  }, []);

  const handleDownloadPDF = useCallback(async () => {
    const element = document.querySelector(".das");
    const canvas = await html2canvas(element, { scale: 3 });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", [210, 600]);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${formTitle}.pdf`);
    
    const pdfURL = pdf.output("bloburl");
    window.open(pdfURL);
  }, [formTitle]);

  return (
    <div className="das">
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
              <button type="button" className="btn btn-success" onClick={handleDownloadPDF}>
                Download Report
              </button>
            </div>
          )}
        </div>
      </div>

      <Map formData={formTypesData} colorScale={["#f0f8ff", "#4682b4"]} />

      <section className="alerts">
        <h2 style={{fontSize:"2rem", margin:"1rem"}}>Alerts</h2>
        <p style={{fontSize:"1.2rem", textAlign: "center" }}>Alerts for subdivisions with high demand.</p>
        <AlertList />
      </section>

      <section className="overview">
        <LinearTotal 
          labels={["Jan", "Feb", "Mar", "Apr", "May"]} 
          data={[60000, 47650, 60450, 34030, 65040]} 
          labelsName="Certificates Issued" 
          title2={title2} 
        />
      </section>
    </div>
  );
};
