import React, { useMemo, useCallback, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import '../profile.css';
import moment from "moment";
import UserVerificatioinModel from "./UserVerificatioinModel";

const UserTracker = React.memo(function Profile({profile = {}, userDetail=[]}) {
  console.log("user",userDetail);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserData, setIsUserData] = useState("")

  
  // export default function Profile({ profile = {} }) {
  const { fullName, email, provider, avatar, employeeId } = profile || {}; 
  
  const handleEditClick = useCallback((data) => {
    setIsUserData(data)
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
            <div className="button"><a href='/userTracker' style={{color:"blue"}}>User Registration</a> </div>
            <div className="button"><a href='/certificateTracker'>Certificate Verification</a> </div>
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
              <h3>User Registration Details</h3>
              
              <Table hoverable className="w-full border border-gray-400 mt-4">
                  <TableHead>
                      <TableHeadCell>Avatar</TableHeadCell>
                      <TableHeadCell>Date</TableHeadCell>
                      <TableHeadCell>Full Name</TableHeadCell>
                      <TableHeadCell>Father's Name</TableHeadCell>
                      <TableHeadCell>Status</TableHeadCell>
                      <TableHeadCell> Details </TableHeadCell>
                  </TableHead>

                  <TableBody className="divide-y ">              
                      {userDetail.map((user, index) => (
                        <TableRow key={index} className="bg-white border-gray-300">
                            <TableCell className="text-black my-0 py-0"><img src={user.avatar} style={{width:"50px", height:"50px", borderRadius:"50%"}} /> </TableCell>
                            <TableCell className="text-black font-bold">{moment(user.createdAt).format('DD-MM-YYYY')}</TableCell>
                            <TableCell className="text-black">{user.fullName}</TableCell>
                            <TableCell className="text-black font-medium">{user.fatherName}</TableCell>
                            <TableCell className="text-black text-center">{user.isVerified}</TableCell>
                            <TableCell>
                                <a className="font-medium text-cyan-600 hover:underline cursor-pointer" onClick={() => handleEditClick(user)}  >
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
    <UserVerificatioinModel user={isUserData} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
})

export default  UserTracker
