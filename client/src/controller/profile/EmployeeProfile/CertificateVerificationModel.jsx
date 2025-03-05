import React, { useEffect, useState } from "react";

import moment from "moment";
import { useDispatch } from "react-redux";
import { sendMail, sendSMS } from "../../../actions/userAction";
import { toast } from "react-toastify";
import SpinnerLoader from "../../../utility/SpinnerLoader";
import FinalCertificate from "../../../dwnCert/FinalCertificate";
import { updateCertificateVerification } from "../../../actions/certificateReportAction";
const CertificateVerificationModel = ({isOpen, onClose, certificateData={}}) => {

  if (!isOpen) return null;
  const date= Date()
  const [pdfFile, setPdfFile] = useState(null);
  const dispatch = useDispatch();
  const [isVerified] = useState(certificateData?.isVerified?.toLowerCase() === "verified");
  const [loading, setLoading] = useState(false); // Loading state to manage spinner visibility
  const [certificateNumber, setCertificateNumber] = useState("")
  const [certificatePath, setCertificatePath] = useState("")

  const handlePdfGenerated = async (pdfFile, certificateId) => {
    if (!pdfFile) return;
    setPdfFile(pdfFile);
    setCertificateNumber(certificateId)
    console.log(certificateId,pdfFile);

  };  
  // email, fullName, certificateId, issueDate, certificatePath
  const handleVerificationApprove = async(e) => {
    e.preventDefault();
    // if (!pdfFile) return toast.error("Pdf not generate yet");
    const formData = new FormData();
    formData.append("certificatePdf", pdfFile);
    formData.append("certificateId", certificateData._id);
    formData.append("certificateNumber", certificateNumber);
    formData.append("isVerified", "Verified")

  //   const emailForm = {
  //     email:certificateData.email,
  //     fullName:certificateData.fullName, 
  //     certificateNumber, 
  //     issueDate:moment(date).format('DD-MM-YYYY'), 
  //     certificatePath: response.data.certificatePdf
  // };
  // console.log(emailForm, certificatePath);
  
    setLoading(true);
    // console.log(certificateData.otrId, "Verified")
    try {
        const response = await dispatch(updateCertificateVerification(formData));
        console.log(response);
        
        if (response.status === 200) {
            toast.success(response.message || "Certification Verification Status Update Successfully!");
            
            const emailForm = {
              email: certificateData.email,
              fullName: certificateData.fullName,
              certificateNumber,
              issueDate: moment(date).format('DD-MM-YYYY'),
              certificatePath: response?.data?.data?.certificatePdf, // ✅ Use the received value directly
            };          
            onClose();
            
            console.log(emailForm);
            
            await dispatch(sendMail(emailForm))
            setLoading(false); // Hide spinner after successful login            
        } else {
            toast.error(response?.data?.message || "Verification failed!", 'error');
            setLoading(false); // Hide spinner if login fails
        }
    } catch (err) {
        toast.error(err.response?.data?.message || err.message || 'Login failed!', 'error');
        setLoading(false); // Hide spinner after error
    }
  }
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 mb-8 pb-8">
        {loading ? (
            <SpinnerLoader /> // Show spinner if loading is true
        ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-lg w-[55vw] max-h-[90vh] overflow-y-auto border">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-3">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Verification for {certificateData.certificateType}
                  </h2>
                  <a className="text-gray-700 text-2xl cursor-pointer" onClick={onClose}>
                    ✖
                  </a>
                </div>
        
                {/* Registration Date & Time */}
                <div className="flex justify-between text-gray-700 text-sm mt-3 border-b pb-2">
                  <p><strong>Application Date:</strong> {moment(certificateData.createdAt).format('DD-MM-YYYY')}</p>
                  <p><strong>Time:</strong> {moment(certificateData.createdAt).format('hh:mm:ss A')}</p>
                </div>

                <div className="flex items-center justify-between my-6 p-4 bg-white rounded-lg shadow">
                    {/* User Avatar */}
                    <div className="flex items-center gap-4">
                        <img
                        src={certificateData.avatar}
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full border-2 border-gray-300 shadow-md"
                        />
                        <div>
                        <p className="text-xl font-semibold text-gray-900">{certificateData.fullName}</p>
                        <p className="text-gray-600 text-sm">📧 {certificateData.email}</p>
                        <p className="text-gray-600 text-sm">📞 {certificateData.phoneNumber}</p>
                        </div>
                    </div>

                    {/* Verification Status & OTR ID */}
                    <div className="text-center">
                      <p className="text-gray-700 font-medium text-md mt-1">
                          <span className="font-bold">Type:</span> Caste Certificate
                      </p>
                      <p className={`text-lg font-semibold ${isVerified ? "text-green-600" : "text-red-500"}`}>
                          {isVerified ? `✅ ${certificateData.isVerified}` : `❌ ${certificateData.isVerified}`}
                      </p>                  
                    </div>
                </div>

                {/* User Details */}
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">User Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 border-b">
                  <p><strong>Full Name:</strong> {certificateData.fullName}</p>
                  <p><strong>Email:</strong> {certificateData.email}</p>
                  <p><strong>Phone:</strong> {certificateData.phoneNumber}</p>
                  <p><strong>DOB:</strong> {certificateData.dob}</p>
                  <p><strong>Father’s Name:</strong> {certificateData.fatherName}</p>
                  <p><strong>Mother’s Name:</strong> {certificateData.motherName}</p>
                  <p><strong>Adhar Number:</strong> {certificateData.aadharNumber}</p>
                  <p><strong>Gender:</strong> {certificateData.gender}</p>
                  <p><strong>Religion:</strong> {certificateData.religion}</p>
                  <p><strong>Cast:</strong> {certificateData.caste}</p>
                  <p className="col-span-2"><strong>Address:</strong> {certificateData.address}</p>
                </div>
        
                {/* Uploaded Documents */}
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-4">Uploaded Documents</h3>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  {certificateData.avatarAdharCard && (
                    <div className="text-center">
                      <p className="text-sm font-bold">Aadhar Card</p>
                      <a href={certificateData.avatarAdharCard} target="_blank" rel="noopener noreferrer">
                        <img src={certificateData.avatarAdharCard} alt="Aadhar" className="w-24 h-24 border shadow-md cursor-pointer hover:scale-105 transition" />
                      </a>
                    </div>
                  )}
                  {certificateData.avatarIncome && (
                    <div className="text-center">
                      <p className="text-sm font-bold">Income Certificate</p>
                      <a href={certificateData.avatarIncome} target="_blank" rel="noopener noreferrer">
                        <img src={certificateData.avatarIncome} alt="Income" className="w-24 h-24 border shadow-md cursor-pointer hover:scale-105 transition" />
                      </a>
                    </div>
                  )}
                  {certificateData.avatarPanCard && (
                    <div className="text-center">
                      <p className="text-sm font-bold">PAN Card</p>
                      <a href={certificateData.avatarPanCard} target="_blank" rel="noopener noreferrer">
                        <img src={certificateData.avatarPanCard} alt="PAN" className="w-24 h-24 border shadow-md cursor-pointer hover:scale-105 transition" />
                      </a>
                    </div>
                  )}
                  {certificateData.avatarAffidavit && (
                    <div className="text-center">
                      <p className="text-sm font-bold">Affidavite Document</p>
                      <a href={certificateData.avatarAffidavit} target="_blank" rel="noopener noreferrer">
                        <img src={certificateData.avatarAffidavit} alt="Income" className="w-24 h-24 border shadow-md cursor-pointer hover:scale-105 transition" />
                      </a>
                    </div>
                  )}
                  {certificateData.certificatePdf && (
                    <div className="text-center">
                      <p className="text-sm font-bold"> Document</p>
                      <a href={certificateData.certificatePdf} target="_blank" rel="noopener noreferrer">
                        <img src={certificateData.certificatePdf} alt="Income" className="w-24 h-24 border shadow-md cursor-pointer hover:scale-105 transition" />
                      </a>
                    </div>
                  )}
                </div>
        
                {/* Action Buttons */}
                <div className="mt-6 flex justify-between">
                    {certificateData?.isVerified?.toLowerCase() === "pending" ? 
                        <>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition w-56 shadow-md" > Reject </button>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-56 transition shadow-md" onClick={handleVerificationApprove} > Generate Certificate </button>
                        </>
                        : ""
                    }
                </div>
              </div>
            </>
      )}
      </div>
  <FinalCertificate certificateData={certificateData}  onPdfGenerated={handlePdfGenerated} />
</>
  );
};

export default CertificateVerificationModel;
