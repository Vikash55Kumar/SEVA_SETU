import React, { useState } from 'react'
import "./LoginSignup.css"
import { useDispatch } from 'react-redux';
import { forgetPassword } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SpinnerLoader from '../../utility/SpinnerLoader';

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false); // Loading state to manage spinner visibility

    const handleLogin =async (e) => {
        e.preventDefault();
        setLoading(true); 

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword); 
        
        try {
            const response =await dispatch(forgetPassword(myForm));
            
            if (response?.data?.success) {
                // Extract the success message
                const successMessage = response.data.message ;
                toast.success(successMessage, 'success');
                // Clear form
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setLoading(false);
                nevigate("/profile");
            } else {
                // Handle the case where response indicates failure
                const errorMessage = response?.data?.message || err.message;
                toast.error(errorMessage, 'error');
                setLoading(false);
            }
           
        } catch (err) {
            // Extract the error message
            const errorMessage = err.response?.data?.message || err.message || 'Forget password failed!';
            toast.error(errorMessage, 'error');
            setLoading(false);
        }
};

  return (
    <div className="login-container">
        {loading ? (
            <SpinnerLoader /> 
        ) : (
        <>
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
            </form>
        </>
        )}
    </div>
  );
}
