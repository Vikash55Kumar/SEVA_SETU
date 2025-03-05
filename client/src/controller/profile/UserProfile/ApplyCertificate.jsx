import React, { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import { registerCertificate } from "../../../actions/certificateReportAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpinnerLoader from "../../../utility/SpinnerLoader";

function ApplyCertificate({ userProfile }) {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    aadharNumber: "",
    dob: "",
    gender: "",
    caste: "",
    email: "",
    religion: "",
    address: "",
    phoneNumber: "",
    motherName: "",
    fatherName: "",
    avatarAffidavit: "",
  });

  const [disableOTR, setDisableOTR] = useState(false);

  // **Pre-fill form fields when userProfile is available**
  useEffect(() => {
    if (userProfile) {
      setFormData({
        aadharNumber: userProfile.aadharNumber || "",
        fullName: userProfile.fullName || "",
        dob: userProfile.dob || "",
        gender: userProfile.gender || "",
        caste: userProfile.caste || "",
        email: userProfile.email || "",
        religion: userProfile.religion || "",
        address: userProfile.address || "",
        phoneNumber: userProfile.phoneNumber || "",
        motherName: userProfile.motherName || "",
        fatherName: userProfile.fatherName || "",
        otrId: userProfile.otrId,
        avatarAffidavit: "",
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleCheckboxChange = (e) => {
    setDisableOTR(e.target.checked);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true); 
    // console.log(formData);

     try {
        const response =await dispatch(registerCertificate(formData));
        // console.log(response);
        
        if (response.statusCode===200 || response.success === "true") {
            
            toast.success(response.message || 'Certificate register suscessfully');
            // clear form
            setFormData({ avatarAffidavit: "" });
            setLoading(false); 
            nevigate("/userDashboard")
            
        } 
      } catch (err) {
          console.log("error 2 ", err);
          toast.error(err || "Certificate register failed");
          setLoading(false); 
      }    
  };

  return (
    <div className="flex justify-center pt-0 p-6">
      {loading ? (
          <SpinnerLoader /> 
      ) : (
      <div className="w-full max-w-5xl bg-white p-8 pt-4 pb-0 shadow-lg mb-16 rounded-lg">
        {/* Header */}
        <header className="flex flex-col items-center justify-center pb-2">
          <img src={logo} className="w-40" alt="Logo" />
          <h1 className="text-2xl mt-3 text-black">Caste Certificate Application Form</h1>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 mb-8 space-y-0">
          {/* Personal Details */}
          <fieldset className="border-blue-600 p-4 rounded-lg">
            <legend className="text-lg font-semibold text-gray-800">Personal Details</legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12 mt-2">
              <div>
                <label className="font-semibold text-gray-700">Aadhar Number:</label>
                <input
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Email ID:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Caste:</label>
                <input
                  type="text"
                  name="caste"
                  value={formData.caste}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Date of Birth:</label>
                <input
                  type="text"
                  name="dob"
                  value={formData.dob}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Gender:</label>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Father Name:</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Mother Name:</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Phone Number:</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Religion:</label>
                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold mt-4 text-gray-700">Residential Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-blue-500"
              />
            </div>
          </fieldset>

          {/* Caste Verification */}
          <fieldset className="border-blue-600 p-4 rounded-lg">
            <legend className="text-lg font-semibold text-gray-800">Caste Verification</legend>

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                checked={disableOTR}
                onChange={handleCheckboxChange}
                className="w-5 h-5"
              />
              <label className="text-gray-700">Father and Mother Caste will not be the same</label>
            </div>

            {disableOTR && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="font-semibold text-gray-700">Affidavit / Other Government Document:</label>
                  <input
                    type="file"
                    name="avatarAffidavit"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <a href="#" className="text-blue-500 underline">Other document requirements</a>
                </div>
              </div>
            )}
          </fieldset>

          {/* Submit Button */}
          <button type="submit" className="w-1/3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            {disableOTR ? "Register to Officer" : "Submit"}
          </button>
        </form>
      </div>
      )}
    </div>
  );
}

export default ApplyCertificate;
