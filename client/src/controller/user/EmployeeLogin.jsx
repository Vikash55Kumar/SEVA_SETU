import React, { useState } from 'react';
import "./auth.css";
import { useDispatch } from 'react-redux';
import { login } from '../../actions/employeeAction';
import { useNavigate } from 'react-router-dom';
import googleImg from "../../assets/google.png";
import { toast } from 'react-toastify';
import SpinnerLoader from '../../utility/SpinnerLoader';
import logo from "../../assets/logo.png"

export default function EmployeeLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [employeeId, setEmployeeId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Loading state to manage spinner visibility

    // console.log(employeeId);
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Show spinner when login starts
        
        const myForm = {
            employeeId,
            password
        };
        
        try {
            const response = await dispatch(login(myForm));
            if (response.status === 200) {
                toast.success("Employee Login Successfully!");
                setEmployeeId('');
                setPassword('');
                setLoading(false); // Hide spinner after successful login
                navigate("/");
            } else {
                toast.error(response?.data?.message || "Login failed!", 'error');
                setLoading(false); // Hide spinner if login fails
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || 'Login failed!', 'error');
            setLoading(false); // Hide spinner after error
        }
    };

    // const handleGoogleLogin = () => {
    //     setLoading(true);
    //     // window.location.href = 'https://seva-setu.onrender.com/api/v1/users/auth/google';
    //     window.location.href=`${import.meta.env.VITE_GOOGLE_URL}`
    // };

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

                        <h3 style={{fontSize:"2rem", marginBottom:"1rem"}}>Employee Login on SevaSetu</h3>

                        {/* <div id="auth-account">
                            <a onClick={handleGoogleLogin}>
                                <img src={googleImg} alt="Google Icon" />
                                <div>Continue with Google</div>
                            </a>
                            <p className="mt-2">—— <b>Or</b> ——</p>
                        </div> */}

                        <form onSubmit={handleLogin}>
                            <div className="form-group-2">
                                <label htmlFor="employeeId">Employee Id:</label>
                                <input
                                    type="employeeId"
                                    id="employeeId"
                                    placeholder="* Enter employeeId"
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group-2">
                                <label htmlFor="password">Password:</label>
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
                                <button type="submit">Login</button>
                            </div>
                        </form>
                    </>
                )}
                <p>Testing purpose only: &nbsp; Id:-EMPD101 &nbsp; password:-vikash</p>
            </div>

        </div>
    );
}
