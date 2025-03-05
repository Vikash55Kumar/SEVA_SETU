import React, { useEffect, useState } from "react";

import moment from "moment";
import { useDispatch } from "react-redux";
import { sendSMS, updateVerificationStatus } from "../../../actions/userAction";
import { toast } from "react-toastify";
import SpinnerLoader from "../../../utility/SpinnerLoader";
const UserVerificatioinModel = ({isOpen, onClose, user={}}) => {
  if (!isOpen) return null;
  const dispatch = useDispatch();
  const [isVerified] = useState(user?.isVerified?.toLowerCase() === "verified");
  const [loading, setLoading] = useState(false); // Loading state to manage spinner visibility

  const handleVerificationApprove = async(e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(user.otrId, "Verified")
    try {
        const response = await dispatch(updateVerificationStatus({ otrId: user.otrId, isVerified: "Verified" }));
        if (response.status === 200) {
            toast.success(response.message || "User Verification Status Update Successfully!");
            onClose();
            await dispatch(sendSMS({otrId:user.otrId, phoneNumber:user.phoneNumber, userName:user.fullName }))
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 mb-8 pb-8">
        {loading ? (
            <SpinnerLoader /> // Show spinner if loading is true
        ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-lg w-[55vw] max-h-[90vh] overflow-y-auto border">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-3">
                  <h2 className="text-2xl font-bold text-gray-800">
                    User OTR Verification
                  </h2>
                  <a className="text-gray-700 text-2xl cursor-pointer" onClick={onClose}>
                    ✖
                  </a>
                </div>
        
                {/* Registration Date & Time */}
                <div className="flex justify-between text-gray-700 text-sm mt-3 border-b pb-2">
                  <p><strong>Registration Date:</strong> {moment(user.createdAt).format('DD-MM-YYYY')}</p>
                  <p><strong>Time:</strong> {moment(user.createdAt).format('hh:mm:ss A')}</p>
                </div>

                <div className="flex items-center justify-between my-6 p-4 bg-white rounded-lg shadow">
                    {/* User Avatar */}
                    <div className="flex items-center gap-4">
                        <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full border-2 border-gray-300 shadow-md"
                        />
                        <div>
                        <p className="text-xl font-semibold text-gray-900">{user.fullName}</p>
                        <p className="text-gray-600 text-sm">📧 {user.email}</p>
                        <p className="text-gray-600 text-sm">📞 {user.phoneNumber}</p>
                        </div>
                    </div>

                    {/* Verification Status & OTR ID */}
                    <div className="text-center">
                        <p className={`text-lg font-semibold ${isVerified ? "text-green-600" : "text-red-500"}`}>
                            {isVerified ? `✅ ${user.isVerified}` : `❌ ${user.isVerified}`}
                        </p>
                        {isVerified ?                     
                            <p className="text-gray-700 font-medium text-md mt-1">
                                <span className="font-bold">OTR ID:</span> {user.otrId}
                            </p>
                            : ""
                        }
                    </div>
                </div>

                {/* User Details */}
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">User Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 border-b">
                  <p><strong>Full Name:</strong> {user.fullName}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phoneNumber}</p>
                  <p><strong>DOB:</strong> {user.dob}</p>
                  <p><strong>Father’s Name:</strong> {user.fatherName}</p>
                  <p><strong>Mother’s Name:</strong> {user.motherName}</p>
                  <p><strong>Father OTR:</strong> {user.fatherOtr || "N/A"}</p>
                  <p><strong>Mother OTR:</strong> {user.motherOtr || "N/A"}</p>
                  <p><strong>Religion:</strong> {user.religion}</p>
                  <p><strong>Cast:</strong> {user.cast}</p>
                  <p className="col-span-2"><strong>Address:</strong> {user.address}</p>
                </div>
        
                {/* Uploaded Documents */}
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-4">Uploaded Documents</h3>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  {user.avatarAdharCard && (
                    <div className="text-center">
                      <p className="text-sm font-bold">Aadhar Card</p>
                      <a href={user.avatarAdharCard} target="_blank" rel="noopener noreferrer">
                        <img src={user.avatarAdharCard} alt="Aadhar" className="w-24 h-24 border shadow-md cursor-pointer hover:scale-105 transition" />
                      </a>
                    </div>
                  )}
                  {user.avatarIncome && (
                    <div className="text-center">
                      <p className="text-sm font-bold">Income Certificate</p>
                      <a href={user.avatarIncome} target="_blank" rel="noopener noreferrer">
                        <img src={user.avatarIncome} alt="Income" className="w-24 h-24 border shadow-md cursor-pointer hover:scale-105 transition" />
                      </a>
                    </div>
                  )}
                  {user.avatarPanCard && (
                    <div className="text-center">
                      <p className="text-sm font-bold">PAN Card</p>
                      <a href={user.avatarPanCard} target="_blank" rel="noopener noreferrer">
                        <img src={user.avatarPanCard} alt="PAN" className="w-24 h-24 border shadow-md cursor-pointer hover:scale-105 transition" />
                      </a>
                    </div>
                  )}
                </div>
        
                {/* Action Buttons */}
                <div className="mt-6 flex justify-between">
                    {user?.isVerified?.toLowerCase() === "pending" ? 
                        <>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition shadow-md" > Reject </button>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition shadow-md" onClick={handleVerificationApprove} > Approve </button>
                        </>
                        : ""
                    }
                </div>
              </div>
            </>
      )}
      </div>
  );
};

export default UserVerificatioinModel;
