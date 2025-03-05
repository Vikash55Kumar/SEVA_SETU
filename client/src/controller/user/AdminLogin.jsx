import React, { useState } from 'react';
import "./auth.css";
import { useDispatch } from 'react-redux';
import { login } from '../../actions/adminAction';
import { useNavigate } from 'react-router-dom';
import googleImg from "../../assets/google.png";
import { toast } from 'react-toastify';
import logo from "../../assets/logo.png"
import SpinnerLoader from '../../utility/SpinnerLoader';

export default function AdminLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [officerId, setOfficerId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Loading state to manage spinner visibility

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Show spinner when login starts
        
        const myForm = {
            officerId,
            password
        };
        
        try {
            const response = await dispatch(login(myForm));
            if (response.status === 200) {
                toast.success("Officer Login Successfully!");
                setOfficerId('');
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

                        <h3 style={{fontSize:"2rem", marginBottom:"1rem"}}>Officer Login on SevaSetu</h3>

                        <form onSubmit={handleLogin}>
                            <div className="form-group-2">
                                <label htmlFor="officerId">Officer Id:</label>
                                <input
                                    type="officerId"
                                    id="officerId"
                                    placeholder="* Enter officer Id"
                                    value={officerId}
                                    onChange={(e) => setOfficerId(e.target.value)}
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
                            {/* <h4 className="mt-2 mb-3">Don't have an account? <a href="/signup">Sign Up</a></h4> */}
                        </form>
                    </>
                )}
                <p>Testing purpose only: &nbsp; Id:-OIPR201 &nbsp; password:-officer</p>
            </div>
        </div>
    );
}
