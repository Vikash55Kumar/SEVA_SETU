// import React from 'react';
// import './ReportDashboard.css'; // Assuming you have a CSS file for styling

// const ReportDashboard = () => {
//   const handleBackToSSO = (event) => {
//     event.preventDefault();
//     const URL = "http://ssotest.rajasthan.gov.in/dashboard";
//     window.location.href = URL; // Redirect to the desired URL
//   };

//   return (
//     <div className="report-dashboard">
//       <header id="header">
//         <div id="logo">
//           <img
//             src="../images/e-mitra-logo.jpg"
//             alt="e-Mitra"
//             title="e-Mitra MIS Portal"
//           />
//         </div>
//         <div className="banner-adds">
//           <h1 className="logo-slogan">
//             <span className="logo-slogan-primary">Government of Rajasthan</span>
//             <br />
//             <span className="logo-slogan-secondary">
//               Department of Information Technology & Communication
//             </span>
//             <span className="logo-slogan-secondary">
//               <form name="frmo" id="frmo" onSubmit={handleBackToSSO}>
//                 <input type="submit" value="Back To SSO" className="button-over" />
//               </form>
//             </span>
//           </h1>
//         </div>
//       </header>

//       <nav className="menu">
//         <ul>
//           <li>
//             <a href="#">New Emitra</a>
//             <ul>
//               <li><a href="/WebSrc/Reports/rpt_new_emitra_dist_summary.jsp">District Summary Report</a></li>
//               <li><a href="/WebSrc/Reports/rpt_newemitra_srv_matrix.jsp">District Wise Emitra Service Matrix Report</a></li>
//               {/* Add other sub-menu links here */}
//             </ul>
//           </li>
//           <li>
//             <a href="#">Application Service</a>
//             <ul>
//               <li><a href="/WebSrc/Reports/rpt_new_emitra_bhamashah_trans1.jsp">Bhamshah Secondary Trans Report</a></li>
//               <li><a href="/WebSrc/Reports/rpt_pendency_new_emitra.jsp">Digital Certificate Pendency</a></li>
//               {/* Add other sub-menu links here */}
//             </ul>
//           </li>
//           {/* Add other main menu items with nested sub-menu items */}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default ReportDashboard;



import React from 'react';
// import './ReportDashboard.css'; // Import the CSS file

function ReportDashboard() {
  return (
    <div className="report-dashboard">
      <header className="dashboard-header">
        <div className="logo-section">
          <img src="" alt="e-Mitra" title="e-Mitra MIS Portal" />
        </div>
        <div className="banner-section">
          <h1>
            <span>Government of Rajasthan</span>
            <br />
            <span className="sub-title">Department of Information Technology & Communication</span>
          </h1>
          <form name="frmo" id="frmo" onSubmit={() => false} method="POST">
            <button type="submit" className="back-button">Back To SSO</button>
          </form>
        </div>
      </header>

      <nav className="menu">
        <ul>
          <li>
            <a href="#">New Emitra</a>
            <ul>
              <li><a href="/WebSrc/Reports/rpt_new_emitra_dist_summary.jsp">District Summary Report</a></li>
              <li><a href="/WebSrc/Reports/rpt_newemitra_srv_matrix.jsp">District Wise Emitra Service Matrix Report</a></li>
              {/* Add additional menu items here */}
            </ul>
          </li>
          <li>
            <a href="#">Application Service</a>
            <ul>
              <li><a href="/WebSrc/Reports/rpt_new_emitra_bhamashah_trans1.jsp">Bhamshah Secondary Trans Report</a></li>
              <li><a href="/WebSrc/Reports/rpt_pendency_new_emitra.jsp">Digital Certificate Pendency</a></li>
            </ul>
          </li>
          {/* Add additional navigation categories here */}
        </ul>
      </nav>
    </div>
  );
}

export default ReportDashboard;
