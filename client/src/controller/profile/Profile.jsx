import React from 'react';
import './profile.css';

export default function Profile({profile = {}}) {
  // export default function Profile({ profile = {} }) {
    const { fullName, email, phoneNumber, provider, createdAt, image, avatar } = profile || {}; 

  return (
    <div className='body3'>
      <div className="profile-background">
        <h2>Details of Employees</h2>
        <div className="profile-container">
          <div className="menu">
            <h2>{fullName || 'Full Name Not Available'}</h2>
            <div className="button"><a href='/employProgress'>Task Status</a> </div>
            <div className="button">Profile Info</div>
            <div className="button">Edit Details</div>
            <div className="button"><a href='/forgot'>Change Password</a>  </div>
          </div>

          <div className="profile-display">
            <div className="profile">
              <div className="profile-header">
                <div className="image">
                <img src={profile.image?.url || avatar} alt="Profile" />
                {/* <img src={image?.url || 'default-image-url'} alt="Profile" /> */}
                </div>
                <div className="name">
                  <h2>{fullName || 'Full Name Not Available'}</h2>
                  <h5>{email || 'Email Not Available'}</h5>
                </div>
              </div>
              <div className="profile-details">
                <li><b>Created: </b> {provider} </li>
                <li><b>Date of Account Creation:</b> {new Date(profile.createdAt).toLocaleDateString()} </li>
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
}
