import React, { useState } from "react";
import PropTypes from "prop-types";
import "./CertificateDashboard.css";

const EmployCertificateDashboard = React.memo(function EmployCertificateDashboard({ employeeProfile = {}, states = [], cases = [] }) {
  const [showSidebar, setShowSidebar] = useState(true); // Toggle for sidebar visibility
  const [selectedState, setSelectedState] = useState(""); // Selected state ID
  const [selectedDistrict, setSelectedDistrict] = useState(""); // Selected district ID
  const [selectedSubdivisions, setSelectedSubdivisions] = useState([]); // Subdivisions for selected district
  const [selectedSubdivision, setSelectedSubdivision] = useState(""); // Selected subdivision ID
  const [certificateType, setCertificateType] = useState(""); // Selected certificate type
  const [filteredCases, setFilteredCases] = useState([]); // State to store filtered cases
  const [certificateTypes] = useState(["Caste"]);

  // New state to store Region & Service Data
  const [regionServiceData, setRegionServiceData] = useState([
    { regionName: "North-East", serviceName: "Caste", resourceAllocation: 30, requiredResource: 10 },
    // You can add more entries here
  ]);

  // Handle state selection and load districts
  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);

    // Reset districts and subdivisions
    setSelectedDistrict("");
    setSelectedSubdivisions([]);
    setSelectedSubdivision("");
  };

  // Handle district selection and load subdivisions
  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);

    const selectedStateObject = states.find((state) => state._id === selectedState);
    const selectedDistrictObject =
      selectedStateObject?.districts.find((district) => district._id === districtId);

    setSelectedSubdivisions(selectedDistrictObject ? selectedDistrictObject.subdivisions : []);
    setSelectedSubdivision(""); // Reset subdivision when district changes
  };

  // Handle subdivision selection
  const handleSubdivisionChange = (e) => {
    setSelectedSubdivision(e.target.value);
  };

  // Handle certificate type selection
  const handleCertificateTypeChange = (e) => {
    setCertificateType(e.target.value);
  };

  const handleSearch = () => {
    if (!selectedState || !selectedDistrict || !selectedSubdivision || !certificateType) {
      alert("Please select all fields before searching.");
      return;
    }

    // Filter the cases based on the selected certificate type
    const filtered = cases.filter((caseItem) => caseItem.certificateType === certificateType);
    setFilteredCases(filtered); // Update filtered cases state

    console.log("Search Parameters:", {
      state: states.find((s) => s._id === selectedState)?.name,
      district: states
        .find((s) => s._id === selectedState)
        ?.districts.find((d) => d._id === selectedDistrict)?.name,
      subdivision: selectedSubdivisions.find((s) => s._id === selectedSubdivision)?.name,
      certificateType,
    });
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  return (
    <div className="certificate-dash">

      <div className={`sidebar ${showSidebar ? "show" : ""}`}>
        <div className="dashboard-menu">
          <h2>Choose Certificate</h2>

          {/* State Selection */}
          <div className="menu-item">
            <span>State</span>
            <select value={selectedState} onChange={handleStateChange}>
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* District Selection */}
          {selectedState && (
            <div className="menu-item">
              <span>District</span>
              <select value={selectedDistrict} onChange={handleDistrictChange}>
                <option value="">Select District</option>
                {states
                  .find((state) => state._id === selectedState)
                  ?.districts.map((district) => (
                    <option key={district._id} value={district._id}>
                      {district.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Subdivision Selection */}
          {selectedDistrict && (
            <div className="menu-item">
              <span>Subdivision</span>
              <select value={selectedSubdivision} onChange={handleSubdivisionChange}>
                <option value="">Select Subdivision</option>
                {selectedSubdivisions.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Certificate Type Selection */}
          {selectedSubdivision && (
            <div className="menu-item">
              <span>Certificate Types</span>
              <select
                value={certificateType}
                onChange={handleCertificateTypeChange}
              >
                <option value="">Select Certificate Type</option>
                {certificateTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Search Button */}
          {certificateType && (
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className={`main-content ${showSidebar ? "sidebar-open" : ""}`}>
        <div className="head1">
          <h1>Employee Resource  Dashboard</h1>
          <div className="header">
            <div>
              <span >Welcome back, &nbsp; {employeeProfile.fullName}</span>
            </div>
            <img src={employeeProfile.avatar} alt="Profile" />
          </div>
        </div>

      {/* Table displaying cases in selected subdivision */}
        <div className="case-info">
          <h3>Cases in {selectedSubdivision || "N/A"}</h3>
        </div>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Type of Certificate</th>
              <th>Total Certificate</th>
              <th>Pending Certificate</th>
              <th>Done Certificate</th>
              <th>Assign</th>


            </tr>
          </thead>
          <tbody>
            {filteredCases.map((caseItem) => (
              <tr key={caseItem._id}>
                <td>{caseItem.certificateType}</td>
                <td>{caseItem.totalCertificate}</td>
                <td>{caseItem.pendingCertificate}</td>
                <td>{caseItem.doneCertificate}</td>
                <td>Approved</td>

              </tr>
            ))}
          </tbody>
        </table>
        
        <br />
        <br />

        {/* Table displaying Region and Service Data when 'Caste' is selected */}
        {certificateType === "Caste" && (
          <div className="case-info">
            <h3>Region & Service Data</h3>
          </div>
        )}

        {certificateType === "Caste" && (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Region Name</th>
                <th>Service Name</th>
                <th>Resource Allocation</th>
                <th>Required Resource</th>
              </tr>
            </thead>
            <tbody>
              {regionServiceData.map((data, index) => (
                <tr key={index}>
                  <td>{data.regionName}</td>
                  <td>{data.serviceName}</td>
                  <td>{data.resourceAllocation}</td>
                  <td>{data.requiredResource}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
})

EmployCertificateDashboard.propTypes = {
  admin: PropTypes.object,
  states: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      districts: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          subdivisions: PropTypes.arrayOf(
            PropTypes.shape({
              _id: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
            })
          ),
        })
      ),
    })
  ),
  cases: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      certificateType: PropTypes.string.isRequired,
      totalCertificate: PropTypes.string.isRequired,
      pendingCertificate: PropTypes.string.isRequired,
      doneCertificate: PropTypes.string.isRequired,
    })
  ),
};

export default EmployCertificateDashboard;

