// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { googleLogin } from '../actions/userAction';
// import { useNavigate } from 'react-router-dom';

// const GoogleLogin = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log("google com in ")
//         const params = new URLSearchParams(window.location.search);
//         const accessToken = params.get('accessToken');
//         const refreshToken = params.get('refreshToken');

//         if (accessToken && refreshToken) {
//             dispatch(googleLogin({ accessToken, refreshToken })).then(() => {
//                 navigate('/dashboard');
//             }).catch((error) => {
//                 console.error('Login failed:', error);
//                 navigate('/login');
//             });
//         } else {
//             navigate('/login');
//         }
//     }, [dispatch, navigate]);

//     return <div>Loading...</div>;
// };

// export default GoogleLogin;

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("GoogleLogin component mounted");

        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');

        console.log("AccessToken:", accessToken);
        console.log("RefreshToken:", refreshToken);

        if (accessToken && refreshToken) {
            console.log("Dispatching googleLogin action");
            dispatch(googleLogin({ accessToken, refreshToken }))
                .then(() => {
                    console.log("Google login successful, navigating to dashboard");
                    navigate('/');
                })
                .catch((error) => {
                    console.log('Login failed:', error);
                    toast.error('Google login failed. Please try again.');
                    navigate('/login');
                });
        } else {
            console.log("No tokens found, redirecting to login");
            toast.error('Invalid login attempt. No tokens provided.');
            navigate('/login');
        }
    }, [dispatch, navigate]);

    return <div>Loading...</div>;
};

export default GoogleLogin;


// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { googleLogin } from '../actions/userAction';
// import { useNavigate } from 'react-router-dom';
// import SpinnerLoader from '../utility/SpinnerLoader'; // Assuming you have a SpinnerLoader component

// const GoogleLogin = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);  // Loading state to manage spinner visibility

//     useEffect(() => {
//         console.log("Processing Google Login...");
//         const params = new URLSearchParams(window.location.search);
//         const accessToken = params.get('accessToken');
//         const refreshToken = params.get('refreshToken');

//         if (accessToken && refreshToken) {
//             dispatch(googleLogin({ accessToken, refreshToken }))
//                 .then(() => {
//                     setLoading(false);
//                     navigate('/dashboard'); // Redirect to dashboard upon success
//                 })
//                 .catch((error) => {
//                     setLoading(false);
//                     console.error('Google Login failed:', error);
//                     navigate('/login');  // Redirect to login if there is an error
//                 });
//         } else {
//             setLoading(false);
//             console.error('Tokens not found in URL');
//             navigate('/login');  // Redirect to login if tokens are missing
//         }
//     }, [dispatch, navigate]);

//     return (
//         <div>
//             {loading ? <SpinnerLoader /> : <div>Login failed, redirecting...</div>}
//         </div>
//     );
// };

// export default GoogleLogin;
