import React from 'react'

export default function CasteCertificate() {
  return (
    <div>
        <div className="user-profile">
            {/* <FaUserCircle style={{ fontSize: "2rem" }} /> */}
            <h2>Vikash Kumar</h2>
            <div className="dropdown-content">
                <a href="">profile</a>
                <a href="#settings">settings</a>
                <a href="/signup">signup</a>
                <a href="/login">login</a>
                <a href="#logout" onClick={handleLogout}>logout</a>
            </div>
        </div>
    </div>
  )
}
