import React from 'react';
import './profile.css';

const Profile = React.memo(function Profile({profile = {}, adminProfile = {}}) {
  const { fullName, email, phoneNumber, provider, createdAt, avatar, officerId, employeeId } = profile || adminProfile || {}; 

  return (
    <div className='body3'>
      <div className="profile-background">
        <h2 style={{fontSize:"2rem", margin:"1rem"}}>Details of {provider}</h2>
        <div className="profile-container">
          <div className="menu">
            <h2>{fullName || 'Full Name Not Available'}</h2>
            <div className="button" style={{color:"blue"}}>Profile Info</div>
            { provider=="Officer" ? (
              <>
              <div className="button"><a href='/employeeTracker'>Employee Status</a> </div>
              </>
            ) : (
              <>
              <div className="button"><a href='/userTracker'>User Register</a> </div>
              <div className="button"><a href='/certificateTracker'>Certificate Verification</a> </div>
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
                  <h2>{fullName} ({officerId || employeeId})</h2>
                  <h5>{email || 'Email Not Available'}</h5>
                </div>
              </div>
              <div className="profile-details">
                <li><b>Created: </b> {provider} </li>
                <li><b>Date of Account Creation:</b> {new Date(createdAt).toLocaleDateString()} </li>
                { provider=="Employee" ? (
                <li><b>Today Deginated At:</b> {profile.division} </li>
                ) :""}
              </div>
            </div>
            <div className="contact">
              <h3>CONTACT DETAILS</h3>
              <li><b>Email Id:</b> {email || 'Email Not Available'}</li>
              <li><b>Mobile:</b> {phoneNumber || 'Phone Number Not Available'}</li>
            </div>
            <div className="contact">
              <h3>ABOUT ME</h3>
              <li>Employees of Seva Setu</li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})

export default  Profile
