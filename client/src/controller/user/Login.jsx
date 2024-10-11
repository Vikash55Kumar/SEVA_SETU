import React, { useState } from 'react';
import "./auth.css";
import { useDispatch } from 'react-redux';
import { login } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import googleImg from "../../assets/google.png";
import { toast } from 'react-toastify';
import SpinnerLoader from '../../utility/SpinnerLoader';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Loading state to manage spinner visibility

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Show spinner when login starts
        
        const myForm = {
            email,
            password
        };
        
        try {
            const response = await dispatch(login(myForm));
            if (response.status === 200) {
                toast.success("Login Successfully!");
                setEmail('');
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

    const handleGoogleLogin = () => {
        setLoading(true);
        // window.location.href = 'https://seva-setu.onrender.com/api/v1/users/auth/google';
        window.location.href=`${import.meta.env.VITE_GOOGLE_URL}`
    };

    return (
        <div className="account-set-main">
            <div className="login-container">
                {loading ? (
                    <SpinnerLoader /> // Show spinner if loading is true
                ) : (
                    <>
                        <h2>Login on SevaSetu</h2>
                        <h4 className="mt-2 mb-3">Don't have an account? <a href="/signup">Sign Up</a></h4>

                        <div id="auth-account">
                            <a onClick={handleGoogleLogin}>
                                <img src={googleImg} alt="Google Icon" />
                                <div>Continue with Google</div>
                            </a>

                            <p className="mt-2">—— <b>Or</b> ——</p>
                        </div>

                        <form onSubmit={handleLogin}>
                            <div className="form-group-2">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="* Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
            </div>
        </div>
    );
}
