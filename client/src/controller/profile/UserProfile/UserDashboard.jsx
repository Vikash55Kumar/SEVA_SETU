import React, { useState } from "react";
import UserSidebar from "./UserSlider";
import UserProfile from "./UserProfile";
import ApplyCertificate from "./ApplyCasteCertificate";
import CertificateStatus from "./CertificateStatus";
import ApplyIncomeCertificate from "./ApplyResidentialCertificate";
import CertificateType from "./CertificateType";

const UserDashboard = ({userProfile={}, certificateDetail=[]}) => {
  const [activeSection, setActiveSection] = useState("profile");
// console.log(certificateDetail);

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <UserProfile userProfile={userProfile} />;
      case "apply":
        return <CertificateType userProfile={userProfile}/>;
      case "status":
        return <CertificateStatus certificateDetail={certificateDetail} userProfile={userProfile} />;
      default:
        return <UserProfile userProfile={userProfile} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar activeSection={activeSection} setActiveSection={setActiveSection} userProfile={userProfile} />
      <div className="flex-1 p-6">{renderSection()}</div>

    </div>
  );
};

export default UserDashboard;
