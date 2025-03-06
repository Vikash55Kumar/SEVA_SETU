import React, { useMemo, useCallback, useState } from "react";
import { FaCheckCircle, FaFileAlt, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from "flowbite-react";
import moment from "moment"

const CertificateStatus = React.memo(function CertificateStatus({ certificateDetail = [] }) {
// console.log(certificateDetail);

    const summaryData = [
      { title: "Total Certificates", count: 7, type: "total", icon: <FaFileAlt className="text-blue-600 text-2xl" /> },
      { title: "Rejected Certificates", count: 4, type: "rejected", icon: <FaTimesCircle className="text-red-600 text-2xl" /> },
      { title: "Pending Certificates", count: 3, type: "pending", icon: <FaHourglassHalf className="text-yellow-600 text-2xl" /> },
      { title: "Completed Certificates", count: 5, type: "completed", icon: <FaCheckCircle className="text-green-600 text-2xl" /> },
    ];
    const downloadPdf = async (pdfUrl) => {
      try {
        const response = await fetch(pdfUrl, { method: "GET" });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, "_blank");
      } catch (error) {
        console.error("Error opening PDF:", error);
      }
    };
    
    
  
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
                  {certificateDetail.slice().reverse().map((certificate, index) => (
                      <TableRow key={index} className="bg-white border-gray-300">
                          <TableCell className="text-black text-center">{certificate.certificateNumber || "N/A"}</TableCell>
                          <TableCell className="text-black font-bold">{moment(certificate.createdAt).format('DD-MM-YYYY')}</TableCell>
                          <TableCell className="text-black text-center">{certificate.fullName}</TableCell>
                          <TableCell className="text-black font-medium">{certificate.certificateType}</TableCell>
                          <TableCell className="text-black font-bold">{moment(certificate.updatedAt).format('DD-MM-YYYY')}</TableCell>
                          <TableCell className="text-red-600 text-center">{certificate.isVerified}</TableCell>
                          <TableCell>
                              <a className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer" onClick={() => downloadPdf(certificate.certificatePdf)} >
                                  View
                              </a>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody> 
          </Table>
      </div>
      
    </div>
  )
});

export default CertificateStatus