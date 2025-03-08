import React, { useState } from "react";
import ApplyCasteCertificate from "./ApplyCasteCertificate";
import ApplyResidentialCertificate from "./ApplyResidentialCertificate";
// import ApplyRationCertificate from "./ApplyRationCertificate";

export default function CertificateType({userProfile={}}) {
  const [selectedCertificate, setSelectedCertificate] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setSelectedCertificate(e.target.value);
    setShowForm(false); // Reset form visibility when changing selection
  };

  const handleFetch = () => {
    if (selectedCertificate) {
      setShowForm(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 px-12 md:px-48">
    {/* Dropdown Selection */}
        <div className="flex flex-row items-center justify-center space-x-4 w-full">
            <label htmlFor="certificate" className="font-semibold text-gray-700 whitespace-nowrap">
            Select Certificate:
            </label>

            {/* Dropdown */}
            <select
            id="certificate"
            name="certificate"
            value={selectedCertificate}
            onChange={handleChange}
            required
            className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            >
            <option value="">Select</option>
            <option value="caste">Caste Certificate</option>
            <option value="residential">Residential Certificate</option>
            <option value="ration">Ration Card</option>
            </select>

            {/* Fetch Button */}
            <button
            onClick={handleFetch}
            className="bg-blue-500 text-white w-1/2 px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
            Fetch From OTR
            </button>
        </div>

        {showForm && (
            <div className="w-full flex justify-center mt-4">
            {selectedCertificate === "caste" && <ApplyCasteCertificate userProfile={userProfile} />}
            {selectedCertificate === "residential" && <ApplyResidentialCertificate userProfile={userProfile} />}
            {/* {selectedCertificate === "ration" && <ApplyRationCertificate userProfile={userProfile} />} */}
            </div>
        )}
    </div>
  );
}
