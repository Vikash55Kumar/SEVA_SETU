import React, { useState } from 'react';
import "./auth.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SpinnerLoader from '../../utility/SpinnerLoader';
import logo from "../../assets/logo.png"
import { login } from '../../actions/userAction';

export default function UserLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userOTR, setuserOTR] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Loading state to manage spinner visibility
   
   
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Show spinner when login starts
        const myForm = {
            otrId:userOTR,
            password
        };
        try {
            const response = await dispatch(login(myForm));
            
            if (response.status === 200) {
                toast.success(response.message || "User Login Successfully!");
                setuserOTR("");
                setPassword("")
                setLoading(false); // Hide spinner after successful login
                navigate("/userDashboard");
            } else {
                toast.error(response?.data?.message || "Login failed!");
                
            }
        } catch (error) {
            toast.error('Login failed!');
            setLoading(false); // Hide spinner after error
        }
    };
    return (
        <div className="account-set-main">
            <div className="login-container">
                {loading ? (
                    <SpinnerLoader /> // Show spinner if loading is true
                ) : (
                    <>
                        <div id="auth-account">
                            <img src={logo} className="logoDas" alt="Logo" />
                        </div>
                        <h3 style={{fontSize:"2rem", marginBottom:"1rem"}}>OTR User Login Form</h3> 
                        <form >
                            <div className="form-group-2">
                                <label htmlFor="userOTR">OTR NUMBER:</label>
                                <input
                                    type="userOTR"
                                    id="userOTR"
                                    placeholder="* Enter User OTR Number"
                                    value={userOTR}
                                    onChange={(e) => setuserOTR(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group-2">
                                <label htmlFor="number">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="* Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group-2">
                                <button type="submit" onClick={handleLogin}>Login</button>
                            </div>
                            <h4 className="mt-2 mb-3">Don't have an account? <a href="/otrRegestration" style={{color:'blue'}}>Sign Up</a></h4>
                        </form>
                    </>
                )}
                {/* <p>Testing purpose only: &nbsp; Id:-UBR1424 &nbsp; password:-9135873454</p> */}
            </div>
        </div>
    );
}
