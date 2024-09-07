import React, { useState } from 'react'
import "./LoginSignup.css"
import { useDispatch } from 'react-redux';
import { forgetPassword } from '../../actions/userAction';
import Notification from '../../utility/Notification';
import useNotification from '../../utility/useNotification';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const {open, message, severity, showNotification, handleClose} = useNotification();
    
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleLogin =async (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword); 
        
        try {
            const response =await dispatch(forgetPassword(myForm));
            
            if (response?.data?.success) {
                // Extract the success message
                const successMessage = response.data.message ;
                showNotification(successMessage, 'success');
                // Clear form
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                nevigate("/profile");
            } else {
                // Handle the case where response indicates failure
                const errorMessage = response?.data?.message || err.message;
                showNotification(errorMessage, 'error');
            }
           
        } catch (err) {
            // Extract the error message
            const errorMessage = err.response?.data?.message || err.message || 'Forget password failed!';
            showNotification(errorMessage, 'error');
        }
};

  return (
    <div className="login-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleLogin}>
        <div className="form-group-2">
                <label htmlFor="old-password">Old Password:</label>
                <input
                    type="password"
                    id="oldpassword"
                    placeholder="* Enter Old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-group-2">
                <label htmlFor="password">New Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="* Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-group-2">
                <label htmlFor="password">Conform Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="* Enter Conform Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-group-2">
                <button type="submit">Submit</button>
            </div>
            <Notification 
                open={open}
                handleClose={handleClose}
                message={message}
                severity={severity}
            />
        </form>
    </div>
  );
}
