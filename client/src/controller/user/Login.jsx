import React, { useEffect, useState } from 'react'
import "./auth.css"
import { useDispatch } from 'react-redux';
import { login} from '../../actions/userAction';
import Notification from '../../utility/Notification';
import useNotification from '../../utility/useNotification';
import { useNavigate } from 'react-router-dom';
import googleImg from "../../assets/google.png"

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const {open, message, severity, showNotification, handleClose} = useNotification();

const handleLogin = async (e) => {
    e.preventDefault();
    
    const myForm = {
        email,
        password
    };
        
    try {
        const response = await dispatch(login(myForm));
        if (response?.data?.success) {
            showNotification(response.data.message, 'success');
            setEmail('');
            setPassword('');
            navigate("/");
        } else {
            showNotification(response?.data?.message || "Login failed!", 'error');
        }
    } catch (err) {
        showNotification(err.response?.data?.message || err.message || 'Login failed!', 'error');
    }
};

  return (
    <div className="account-set-main">
      <div className="login-container">
        <h2>Login on SevaSetu</h2>
        <h4 className="mt-2 mb-3">Don't have an account? <a href="/signup">Sign Up</a></h4>
        
        <div id="auth-account">
          <a onClick={() => window.location.href = '/api/v1/users/auth/google'}>
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
            <Notification 
                open={open}
                handleClose={handleClose}
                message={message}
                severity={severity}
            />
        </form>
    </div>
    </div>
  );
}
