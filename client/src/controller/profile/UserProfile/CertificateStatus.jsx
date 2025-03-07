import React, { useMemo, useCallback, useState } from "react";
import { FaCheckCircle, FaFileAlt, FaTimesCircle, FaHourglassHalf, FaFileDownload, FaDownload } from "react-icons/fa";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from "flowbite-react";
import moment from "moment"
import SpinnerLoader from "../../../utility/SpinnerLoader";

const CertificateStatus = React.memo(function CertificateStatus({ certificateDetail = [], userProfile={userProfile} }) {
  const [loading, setLoading] = useState(false); // Loading state to manage spinner visibility
  console.log(certificateDetail, userProfile);
  
  const filteredCertificates = certificateDetail.filter((certificate) => 
    certificate.owner.includes(userProfile._id)
  );
    const summaryData = [
      { title: "Total Certificates", count: 7, type: "total", icon: <FaFileAlt className="text-blue-600 text-2xl" /> },
      { title: "Rejected Certificates", count: 4, type: "rejected", icon: <FaTimesCircle className="text-red-600 text-2xl" /> },
      { title: "Pending Certificates", count: 3, type: "pending", icon: <FaHourglassHalf className="text-yellow-600 text-2xl" /> },
      { title: "Completed Certificates", count: 5, type: "completed", icon: <FaCheckCircle className="text-green-600 text-2xl" /> },
    ];
    const downloadPdf = async (pdfUrl) => {
      setLoading(true);
      try {
        const response = await fetch(pdfUrl, { method: "GET" });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, "_blank");
        setLoading(false);
      } catch (error) {
        console.error("Error opening PDF:", error);
        setLoading(false);
      }
    };
    
    
  
  return (
    <div className="flex-1 p-6">
      {/* Summary Cards */}
      {loading ? (
          <SpinnerLoader /> // Show spinner if loading is true
      ) : (
        <>
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

          <div className="overflow-x-auto bg-white p-4 m-4">
              <span className="flex justify-center text-3xl">Certificate Status</span>
              <Table hoverable className="w-full border border-gray-400 mt-4">
                  <TableHead>
                      <TableHeadCell>Certificate NO.</TableHeadCell>
                      <TableHeadCell>Register Date</TableHeadCell>
                      <TableHeadCell>Full Name</TableHeadCell>
                      <TableHeadCell>Certificate Type</TableHeadCell>
                      <TableHeadCell>Last Update</TableHeadCell>
                      <TableHeadCell>Status</TableHeadCell>
                      <TableHeadCell> Download </TableHeadCell>
                  </TableHead>

                  <TableBody className="divide-y ">              
                      {filteredCertificates.slice().reverse().map((certificate, index) => (
                          <TableRow key={index} className="bg-white border-gray-300">
                              <TableCell className="text-black text-center">{certificate.certificateNumber || "N/A"}</TableCell>
                              <TableCell className="text-black font-bold">{moment(certificate.createdAt).format('DD-MM-YYYY')}</TableCell>
                              <TableCell className="text-black text-left">{certificate.fullName}</TableCell>
                              <TableCell className="text-black font-medium">{certificate.certificateType}</TableCell>
                              <TableCell className="text-black font-bold">{moment(certificate.updatedAt).format('DD-MM-YYYY')}</TableCell>
                              <TableCell className="text-red-600 text-left">{certificate.isVerified}</TableCell>
                              <TableCell className="flex text-center  justify-center">
                                {certificate.isVerified === "Verified" ? 
                                  <a className=" cursor-pointer" onClick={() => downloadPdf(certificate.certificatePdf)} >
                                    <FaDownload className="text-xl"/>
                                  </a> : "N/A"
                                }
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody> 
              </Table>
          </div>
        </>
      )}
    </div>
  )
});

export default CertificateStatus