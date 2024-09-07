import React, { useState } from 'react'
import "../user/LoginSignup.css"

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("")

  const handleContact = (e) => {
    e.preventDefault();
    // Add Contact logic here
};

  return (
    <div className="login-container">
        <h2>Contact</h2>
        <form onSubmit={handleContact}>
            <div className="form-group-2">
                <label htmlFor="name">Name:</label>
                <input
                    type="name"
                    id="name"
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group-2">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group-2">
                <label htmlFor="message">Message:</label>
                <input
                    type="message"
                    id="message"
                    placeholder='Leave Querires'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
            </div>
            <div className="form-group-2">
                <button type="submit">Contact</button>
            </div>
        </form>
    </div>
  );
}
