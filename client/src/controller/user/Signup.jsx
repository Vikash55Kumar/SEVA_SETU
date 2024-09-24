import React, {useState} from 'react'
import "./auth.css"
import { useDispatch} from 'react-redux';
import { register } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import googleImg from "../../assets/google.png"
import { toast } from 'react-toastify';
import SpinnerLoader from '../../utility/SpinnerLoader';


export default function Signup() {
    const dispatch = useDispatch();
    const nevigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conformPassword, setConformPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState('');
    const [loading, setLoading] = useState(false); // Loading state to manage spinner visibility

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true); 
        
        const myForm = new FormData();

        myForm.append("fullName", name);
        myForm.append("email", email);
        myForm.append("password", password);
        myForm.append("conformPassword", conformPassword); 
        myForm.append("phoneNumber", phone);
        myForm.append("avatar", avatar);
        
        try {
            const response =await dispatch(register(myForm));
            
            if (response?.data?.success) {
                
                const successMessage = response.data.message ;
                toast.success(successMessage, 'success');
                // clear form
                setName('');
                setEmail('');
                setPassword('');
                setConformPassword('');
                setPhone('');
                setAvatar('');

                setLoading(false); 
                nevigate("/login")
                
            } else {
                const errorMessage = response?.data?.message || err.message;
                console.log("error 1 ", errorMessage);
                toast.error(errorMessage, 'error');
            }

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Regestration failed!';
            console.log("error 2 ", errorMessage);
            toast.error(errorMessage, 'error');
        }

    };

    const handleGoogleLogin = () => {
      setLoading(true);
      // window.location.href = 'https://seva-setu.onrender.com/api/v1/users/auth/google';
      window.location.href=`${import.meta.env.VITE_GOOGLE_URL}`
      // window.location.href = '/api/v1/users/auth/google'
    };

  return (

    <div className="account-set-main">
      <div className="signup-container">
      {loading ? (
          <SpinnerLoader /> 
      ) : (
        <>
          <h2>SignUp on SevaSetu</h2>
            <h4 className="mt-2 mb-3">Have an account? <a href="/login">Log In</a></h4>
            <div id="auth-account">
               <a onClick={handleGoogleLogin}>
                    <img src={googleImg} alt="Google Icon" />
                    <div>Continue with Google</div>
                </a>
              <p className="mt-2">—— <b>Or</b> ——</p>
            </div>
            <form onSubmit={handleSignUp} className='form'>
              <div className="form-group-2">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="* Enter Name"
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
                  placeholder="* Enter Email"
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
                  placeholder="* Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-2">
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="* Enter Confirm Password"
                  value={conformPassword}
                  onChange={(e) => setConformPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-2">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  pattern="[0-9]{10,14}"
                  placeholder="* Enter Valid Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-group-2">
                <label htmlFor="avatar">Profile Image</label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  required
                />
              </div>

              <div className="form-group-2">
                <button type="submit">Sign Up</button>
              </div>
            </form>
        </>
      )}
      </div>
    </div>
    
  )
}
