import { getAccessToken, setAccessToken } from '../utility/tokenUtils';
import Cookies from 'js-cookie';
import { deleteAllCookies } from '../utility/tokenUtils';
import { toast } from 'react-toastify';
import { 

    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
    
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    FORGOTPASSWORD_REQUEST,
    FORGOTPASSWORD_SUCCESS,
    FORGOTPASSWORD_FAIL,

    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_FAIL,

    UPDATE_VERIFICATION_STATUS_REQUEST,
    UPDATE_VERIFICATION_STATUS_SUCCESS,
    UPDATE_VERIFICATION_STATUS_FAIL,
    
    SEND_SMS_REQUEST,
    SEND_SMS_SUCCESS,
    SEND_SMS_FAIL,
    SEND_MAIL_REQUEST,
    SEND_MAIL_SUCCESS,
    SEND_MAIL_FAIL,
    GENERATE_OTP_REQUEST,
    GENERATE_OTP_SUCCESS,
    GENERATE_OTP_FAIL,
    AADHAR_VERIFICATION_REQUEST,
    AADHAR_VERIFICATION_SUCCESS,
    AADHAR_VERIFICATION_FAIL,
    
} from '../constants/userConstants';

import api from '../utility/api';


export const getUserDetails = () => async (dispatch) => {
    try {
      dispatch({ type: GET_USER_REQUEST });
  
      const {data} = await api.get("/users/getUserDetails"); // Adjust the endpoint if necessary
    //   console.log("Get user : ", data);
      
      dispatch({
        type: GET_USER_SUCCESS,
        payload: data,
      });
  
    } catch (error) {
      dispatch({
        type: GET_USER_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const register = (formData) => async (dispatch) => {
    try {
        dispatch({ type: USER_SIGNUP_REQUEST });

        const response =await api.post("/users/registrUser", formData, {
            headers: {
                "Content-Type" :"multipart/form-data",
            }
        });
        console.log("response", response);
        

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: response.data
        });
        return response;

    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.message || error.message
        });
        throw error;
    }
};

export const login = (credentials) => async (dispatch) => {
    
    try {

        dispatch({ type: USER_LOGIN_REQUEST});

        const response = await api.post("/users/loginUser", credentials);
        const { tokens } = response.data; // Adjust based on your response structure
        const { accessToken } = tokens; // Extract the access token

        if (!accessToken) {
            throw new Error('Access token not found');
        }
        
        // Save token in cookies
        Cookies.set('token', accessToken, { expires: 7, path: '/' }); // Token will be stored for 7 days
        dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
        return response;
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload: error.response?.data?.message || error.message });
        throw error;
    }
};

export const forgetPassword = (userData) => async (dispatch) => {
    try {
        dispatch({ type: FORGOTPASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await api.post('/employee/forgetPassword', userData, config);

        dispatch({
            type: FORGOTPASSWORD_SUCCESS,
            payload: response.data
        });
        return response;

    } catch (error) {
        dispatch({
            type: FORGOTPASSWORD_FAIL,
            payload: error.response.data.message || error.message,
        });
        throw error;
    }
};

export const updateVerificationStatus = (otrId, isVerified) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_VERIFICATION_STATUS_REQUEST });

        const response = await api.post('/users/updateVerification', otrId, isVerified);

        
        dispatch({
            type: UPDATE_VERIFICATION_STATUS_SUCCESS,
            payload: response.data
        });
        return response;

    } catch (error) {
        dispatch({
            type: UPDATE_VERIFICATION_STATUS_FAIL,
            payload: error.response.data.message || error.message,
        });
        throw error;
    }
};

export const sendMail = (emailData) => async (dispatch) => {
    try {
        dispatch({ type: SEND_MAIL_REQUEST });
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await api.post('/users/sendMail', emailData, config);

        dispatch({
            type: SEND_MAIL_SUCCESS,
            payload: response.data
        });
        return response;

    } catch (error) {
        dispatch({
            type: SEND_MAIL_FAIL,
            payload: error.response.data.message || error.message,
        });
        throw error;
    }
};

export const sendSMS = (otrId, phoneNumber, userName) => async (dispatch) => {
    try {
        dispatch({ type: SEND_SMS_REQUEST });

        const response = await api.post('/users/sendSMS', otrId, phoneNumber, userName);

        dispatch({
            type: SEND_SMS_SUCCESS,
            payload: response.data
        });
        return response;

    } catch (error) {
        dispatch({
            type: SEND_SMS_FAIL,
            payload: error.response.data.message || error.message,
        });
        throw error;
    }
};

export const generateAadharOtp = (aadharNumber) => async (dispatch) => {
    try {
        dispatch({ type: GENERATE_OTP_REQUEST });
        
        const response = await api.post('/users/generateAadharOtp', aadharNumber);
        console.log(response);

        dispatch({
            type: GENERATE_OTP_SUCCESS,
            payload: response.data
        });
        return response;

    } catch (error) {
        dispatch({
            type: GENERATE_OTP_FAIL,
            payload: error.response.data.message || error.message,
        });
        throw error;
    }
};

export const verifyAadhar = (otp, reference_id, phoneNumber) => async (dispatch) => {
    try {
        dispatch({ type: AADHAR_VERIFICATION_REQUEST });
        
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // };
        const response = await api.post('/users/verifyAadharOtp', otp, reference_id, phoneNumber);
        console.log(response);
        
        dispatch({
            type: AADHAR_VERIFICATION_SUCCESS,
            payload: response.data
        });
        return response;

    } catch (error) {
        dispatch({
            type: AADHAR_VERIFICATION_FAIL,
            payload: error.response.data.message || error.message,
        });
        throw error;
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        // Try to retrieve the token from localStorage first, then fallback to cookies
        const accessToken = localStorage.getItem('accessToken') || Cookies.get('token');
        console.log('Access token retrieved user:', accessToken);

        if (!accessToken) {
            throw new Error("Access token not found");
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        const { data } = await api.get("/users/getUser", config);
        // console.log('API response:', data);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data
        });

    } catch (error) {
        // console.error('Error:', error);
        dispatch({
          type: LOAD_USER_FAIL,
          payload: error.response?.data?.message || error.message,
        });
      }
      
};

export const googleLogin = (tokens) => async (dispatch) => {
  try {
      dispatch({ type: GOOGLE_LOGIN_REQUEST });

      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      };
      console.log("Making POST request to /employee/googleLogin with tokens:", tokens);
 
      const response = await api.post('/employee/googleLogin', tokens, config);

      const { accessToken, refreshToken, user } = response.data.data;

      // Store tokens in localStorage
      localStorage.setItem('accessToken', accessToken);

      localStorage.setItem('refreshToken', refreshToken);

      // Dispatch success with user data
      dispatch({
          type: GOOGLE_LOGIN_SUCCESS,
          payload: user,
      });
      toast.success("Login Successfully!")
      return response;

  } catch (error) {
      toast.error('Google Login Error:', error.response.data.message || error.message);
      dispatch({
          type: GOOGLE_LOGIN_FAIL,
          payload: error.response.data.message || error.message,
      });

      throw error;
  }
};

