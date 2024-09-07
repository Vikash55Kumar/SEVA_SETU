import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("google com in ")
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');

        if (accessToken && refreshToken) {
            dispatch(googleLogin({ accessToken, refreshToken })).then(() => {
                navigate('/dashboard');
            }).catch((error) => {
                console.error('Login failed:', error);
                navigate('/login');
            });
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate]);

    return <div>Loading...</div>;
};

export default GoogleLogin;
