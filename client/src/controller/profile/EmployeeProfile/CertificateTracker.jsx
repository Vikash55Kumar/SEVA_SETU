import React, { useMemo, useCallback, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import '../profile.css';
import moment from "moment";
import CertificateVerificationModel from "./CertificateVerificationModel";

const CertificateTracker = React.memo(function Profile({employeeProfile = {}, certificateDetail=[]}) {
  // console.log("user",certificateDetail);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCertificateData, setIsCertificateData] = useState("")

  
  // export default function employeeProfile({ employeeProfile = {} }) {
  const { fullName, email, provider, avatar, employeeId } = employeeProfile || {}; 
  
  const handleEditClick = useCallback((data) => {
    setIsCertificateData(data)
    setIsModalOpen(true)
  }, []);

  return (
    <>
    <div className='body3'>
      <div className="profile-background">
        <h2 style={{fontSize:"2rem", margin:"1rem"}}>{provider} Dashobard</h2>
        <div className="profile-container">
          
          <div className="menu">
            <h2>{fullName} </h2>
            <div className="button"><a href="/profile">Profile Info</a> </div>
            <div className="button"><a href='/userTracker'>User Registration</a> </div>
            <div className="button" ><a href='/certificateTracker' style={{color:"blue"}}>Certificate Verification</a> </div>
            <div className="button"><a href='/employProgress'>Track Status</a> </div>
            <div className="button">Edit Details</div>
          </div>

          <div className="profile-display">
            <div className="profile">
              <div className="profile-header">

                <div className="image">
                  <img src={ avatar} alt="Profile" />
                </div>

                <div className="name">
                  <h2>{fullName} ({employeeId}) </h2>
                  <h5>{email}</h5>
                </div>

              </div>
            </div>

            <div className="contact">
              <h3>Certificate Details</h3>
              
              <Table hoverable className="w-full border border-gray-400 mt-4">
                  <TableHead>
                      {/* <TableHeadCell>Avatar</TableHeadCell> */}
                      <TableHeadCell>Application Date</TableHeadCell>
                      <TableHeadCell>Full Name</TableHeadCell>
                      <TableHeadCell>Father's Name</TableHeadCell>
                      <TableHeadCell>Certificate Type</TableHeadCell>
                      <TableHeadCell>Status</TableHeadCell>
                      <TableHeadCell> Details </TableHeadCell>
                  </TableHead>

                  <TableBody className="divide-y ">              
                      {certificateDetail.map((certificate, index) => (
                        <TableRow key={index} className="bg-white border-gray-300">
                            {/* <TableCell className="text-black my-0 py-0"><img src={certificate.avatar} style={{width:"50px", height:"50px", borderRadius:"50%"}} /> </TableCell> */}
                            <TableCell className="text-black font-bold">{moment(certificate.createdAt).format('DD-MM-YYYY')}</TableCell>
                            <TableCell className="text-black">{certificate.fullName}</TableCell>
                            <TableCell className="text-black font-medium">{certificate.fatherName}</TableCell>
                            <TableCell className="text-black font-medium">{certificate.certificateType}</TableCell>
                            <TableCell className="text-black text-center">{certificate.isVerified}</TableCell>
                            <TableCell>
                                <a className="font-medium text-cyan-600 hover:underline cursor-pointer" onClick={() => handleEditClick(certificate)}  >
                                    View
                                </a>
                            </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CertificateVerificationModel certificateData={isCertificateData} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
})

export default  CertificateTracker
