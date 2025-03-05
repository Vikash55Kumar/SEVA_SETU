import React from "react";
import { FaCheckCircle, FaCalendar, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaFileAlt, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";
import moment from "moment";

const UserProfile = React.memo(function UserProfile({ userProfile = {} }) {
  const summaryData = [
    { title: "Total Certificates", count: 6, type: "total", icon: <FaFileAlt className="text-blue-600 text-2xl" /> },
    { title: "Rejected Certificates", count: 6, type: "rejected", icon: <FaTimesCircle className="text-red-600 text-2xl" /> },
    { title: "Pending Certificates", count: 5, type: "pending", icon: <FaHourglassHalf className="text-yellow-600 text-2xl" /> },
    { title: "Completed Certificates", count: 5, type: "completed", icon: <FaCheckCircle className="text-green-600 text-2xl" /> },
  ];

  return (
    <div className="flex-1 p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-4 p-6 bg-white text-gray-800 rounded-lg border-2 border-blue-500 shadow-md transition-all hover:shadow-xl hover:scale-105"
          >
            <div>
              <h3 className="flex justify-center text-2xl text-gray-900 font-extrabold">
                {item.icon} &nbsp; {item.count}
              </h3>
              <p className="text-lg font-semibold text-gray-700">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Welcome Message */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
        <h2 className="text-lg text-left font-semibold text-gray-700">Welcome back,</h2>
        <h2 className="text-2xl text-left font-extrabold text-gray-800">Dashboard - Profile Page</h2>
      </div>

      {/* Profile Section */}
      <div className="bg-white p-8 shadow-lg rounded-xl">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <img
            src={userProfile.avatar}
            alt="User Avatar"
            className="w-36 h-36 rounded-full border-4 border-blue-500 shadow-lg hover:scale-105 transition"
          />
          <div>
            <h2 className="text-2xl text-left font-bold text-gray-800">{userProfile.fullName}</h2>
            <p className="text-gray-500 text-sm flex items-center mt-1"><FaEnvelope className="mr-2" /> {userProfile.email}</p>
            <p className="text-gray-500 text-sm flex items-center"><FaPhone className="mr-2" /> {userProfile.phoneNumber}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* User Details Grid */}
        <div className="grid grid-cols-2 w-full gap-6 text-gray-700">
          <p className="flex items-center text-lg"><FaMapMarkerAlt className="mr-2 text-blue-600" /><strong>Address:</strong> &nbsp; {userProfile.address}</p>
          <p className="flex items-center text-lg"><FaIdCard className="mr-2 text-blue-600" /><strong>OTR ID:</strong> &nbsp; <span className="text-blue-600 font-semibold">{userProfile.otrId}</span></p>
          <p className="flex items-center text-lg">
            <FaCheckCircle className="mr-2 text-green-600" />
            <strong>Verification Status:</strong> 
            <span className=" ml-2 px-2 py-1 rounded-md text-white font-semibold bg-green-500">
              {userProfile.isVerified}
            </span>
          </p>
          <p className="flex items-center text-lg">
          <FaCalendar className="mr-2 text-blue-500" />
            <strong>Registered On: &nbsp;</strong> {moment(userProfile.createdAt).format('DD-MM-YYYY')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition">✏️ Edit Profile</button>
        </div>
      </div>
    </div>
  );
});

export default UserProfile;
