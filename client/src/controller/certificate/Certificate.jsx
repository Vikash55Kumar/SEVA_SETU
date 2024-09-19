import React from 'react'
import "./Certificate.css"


export default function Certificate() {
  return (
    <div>
        <h2>Certificate Apply</h2>
      <div className="certificate">
        <div className="card"><a href='/dashboard' >Cast Certificate</a></div>
        <div className="card"><a href='/dashboard' >Income Certificate</a></div>
        <div className="card"><a href='/dashboard' >Residential Certificate</a></div>
        <div className="card"><a href='' >Ration Card</a></div>
        <div className="card"><a href='/dashboard' >Birth Certificate</a></div>
        <div className="card"><a href='' >Disability Certificates</a></div>
        <div className="card"><a href='' >Marriage Certificates</a></div>
        <div className="card"><a href='' >Senior Citizen Certificates</a></div>
        <div className="card"><a href='' >Character Certificates</a></div>
      </div>
    </div>
  )
}
