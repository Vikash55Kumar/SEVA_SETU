import React, { useRef, useState } from "react";
import "../user/LoginSignup.css";
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import SpinnerLoader from "../../utility/SpinnerLoader";

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const form = useRef(null);
    console.log(form);

    const sendEmail = (e) => {
        e.preventDefault();
 
        setLoading(true); // Show spinner when login starts

        if (!form.current) {
            toast.error("Form reference is not set!");
            return;
        }

        emailjs
        .sendForm("service_shadr0o", "template_mj7rlbd", form.current, {
            publicKey: `${import.meta.env.VITE_PUBLIC_KEY}`,
        })
        .then(
            (result) => {
            e.target.reset();
            setLoading(false); 
            toast.success("Form submit successfully");
            },
            (error) => {
            // console.log("FAILED...", error.text);
            setLoading(false); 
            toast.error("Form not submit successfully");
            }
        );
    };
    return (
        <div className="login-container">
        {loading ? (
            <SpinnerLoader /> // Show spinner if loading is true
        ) : (
            <>
                <h2 style={{ fontSize: "2rem" }}>Contact</h2>
                <form ref={form} onSubmit={sendEmail}>
                    <div className="form-group-2">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" placeholder="* Enter Name" required />
                    </div>
                    <div className="form-group-2">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" placeholder="* Enter Email" required />
                    </div>
                    <div className="form-group-2">
                        <label htmlFor="message">Message:</label>
                        <textarea style={{ width: "95%" }} type="text" name="message" required rows={4} placeholder="* Your message" />
                    </div>
                    <div className="form-group-2">
                        <button type="submit"> Submit </button>
                    </div>
                </form>
            </>
        )}
        </div>
    );
}
