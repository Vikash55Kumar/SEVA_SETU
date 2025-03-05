import React from 'react'
import "./HomePage.css";

export default function QuickLink() {
  return (
    <div>
        <section className="quick-access">
            <h2>Quick Access</h2>
            <div className="links">
            {/* <a href="/certificate">Apply for a New Certificate</a>
            <a href="/status">Check Application Status</a> */}
            <a href="/dashboard">Go to Dashboard</a>
            </div>
        </section>
    </div>
  )
}
