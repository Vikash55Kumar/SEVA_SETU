import React, { useMemo, useCallback, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import '../profile.css';
import moment from "moment";
import EmployeeModel from "./EmployeeModel";

const EmployeeTracker = React.memo(function Profile({profile = {}, adminProfile = {}, employeeDetail=[]}) {
  console.log("user",employeeDetail);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmployeeData, setIsEmployeeData] = useState("")

  
  // export default function Profile({ profile = {} }) {
  const { fullName, email, phoneNumber, provider, createdAt, image, avatar, officerId, employeeId } = profile || adminProfile || {}; 
  
  const handleEditClick = useCallback((data) => {
    setIsEmployeeData(data)
    setIsModalOpen(true)
    // console.log(data);
  }, []);

  return (
    <>
    <div className='body3'>
      <div className="profile-background">
        <h2 style={{fontSize:"2rem", margin:"1rem"}}>Details of {provider}</h2>
        <div className="profile-container">
          
          <div className="menu">
            <h2>{fullName} </h2>
            <div className="button"><a href="/profile">Profile Info</a> </div>
            { provider=="Officer" ? (
              <>
              <div className="button"> Employee Status </div>
              </>
            ) : (
              <>
              <div className="button"><a href='/employProgress'>Track Status</a> </div>
              </>
            ) }
            
            <div className="button">Edit Details</div>
            <div className="button"><a href='/forgot'>Change Password</a>  </div>
          </div>

          <div className="profile-display">
            <div className="profile">
              <div className="profile-header">

                <div className="image">
                  <img src={ avatar} alt="Profile" />
                </div>

                <div className="name">
                  <h2>{fullName} ({officerId || employeeId}) </h2>
                  <h5>{email || 'Email Not Available'}</h5>
                </div>

              </div>
            </div>

            <div className="contact">
              <h3>Employee Details</h3>
              
              <Table hoverable className="w-full border border-gray-400 mt-4">
                  <TableHead>
                      <TableHeadCell>Avatar</TableHeadCell>
                      <TableHeadCell>Date</TableHeadCell>
                      <TableHeadCell>Full Name</TableHeadCell>
                      <TableHeadCell>Email</TableHeadCell>
                      <TableHeadCell>Employee ID</TableHeadCell>
                      <TableHeadCell> View </TableHeadCell>
                  </TableHead>

                  <TableBody className="divide-y ">              
                      {employeeDetail.map((employee, index) => (
                        <TableRow key={index} className="bg-white border-gray-300">
                            <TableCell className="text-black my-0 py-0"><img src={employee.avatar} style={{width:"50px", height:"50px", borderRadius:"50%"}} /> </TableCell>
                            <TableCell className="text-black font-bold">{moment(employee.createdAt).format('DD-MM-YYYY')}</TableCell>
                            <TableCell className="text-black">{employee.fullName}</TableCell>
                            <TableCell className="text-black font-medium">{employee.email}</TableCell>
                            <TableCell className="text-black text-center">{employee.employeeId}</TableCell>
                            <TableCell>
                                <a className="font-medium text-cyan-600 hover:underline cursor-pointer" onClick={() => handleEditClick(employee)}  >
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
    <EmployeeModel employeeTrackedData={isEmployeeData} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
})

export default  EmployeeTracker
