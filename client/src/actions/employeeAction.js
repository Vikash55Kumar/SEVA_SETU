
import { getAccessToken, setAccessToken } from '../utility/tokenUtils';
import Cookies from 'js-cookie';
import { deleteAllCookies } from '../utility/tokenUtils';
import { toast } from 'react-toastify';
import { 

    SIGNUP_REQUEST, 
    SIGNUP_SUCCESS, 
    SIGNUP_FAIL, 

    LOGIN_SUCCESS,
    LOGIN_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    FORGOTPASSWORD_REQUEST,
    FORGOTPASSWORD_SUCCESS,
    FORGOTPASSWORD_FAIL,

    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_FAIL,
    
    GET_EMPLOYEE_DETAIL_REQUEST,
    GET_EMPLOYEE_DETAIL_SUCCESS,
    GET_EMPLOYEE_DETAIL_FAIL,

    LOAD_EMPLOYEE_REQUEST,
    LOAD_EMPLOYEE_SUCCESS,
    LOAD_EMPLOYEE_FAIL,
    
} from '../constants/userConstants';

import api from '../utility/api';


export const getEmployeeDetails = () => async (dispatch) => {
    try {
      dispatch({ type: GET_EMPLOYEE_DETAIL_REQUEST });
  
      const {data} = await api.get("/employee/getUserDetails"); // Adjust the endpoint if necessary
    //   console.log("Get user : ", data);
      
      dispatch({
        type: GET_EMPLOYEE_DETAIL_SUCCESS,
        payload: data,
      });
  
    } catch (error) {
      dispatch({
        type: GET_EMPLOYEE_DETAIL_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const register = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SIGNUP_REQUEST });

        const response =await api.post("/employee/register", formData, {
            headers: {
                "Content-Type" :"multipart/form-data",
            }
        });

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: response.data
        });
        return response;

    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: error.response.data.message || error.message
        });
        throw error;
    }
};

export const login = (credentials) => async (dispatch) => {
    try {
        const response = await api.post("/employee/login", credentials);
        const { tokens } = response.data; // Adjust based on your response structure
        const { accessToken } = tokens; // Extract the access token

        if (!accessToken) {
            throw new Error('Access token not found');
        }
        
        // Save token in cookies
        Cookies.set('token', accessToken, { expires: 7, path: '/' }); // Token will be stored for 7 days
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        return response;
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response?.data?.message || error.message });
        throw error;
    }
};

export const logout = () => async (dispatch) => {
  try {
      // Clear cookies
      const deleteAllCookies = () => {
          const cookies = document.cookie.split(";");

          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i];
              const eqPos = cookie.indexOf("=");
              const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
              document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
          }
      };
      deleteAllCookies();

      // Clear tokens from storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.clear();

      // Optionally, call your backend to log out
    //   await api.post("/employee/logout");

      dispatch({ type: LOGOUT_SUCCESS });

      setTimeout(() => {
          toast.success('Logout successful');
      }, 2000);

  } catch (error) {
      toast.error('Logout error: Please refresh the page to logout');
      dispatch({
          type: LOGOUT_FAIL,
          payload: error.response?.data?.message || error.message,
      });
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

export const loadEmployee = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_EMPLOYEE_REQUEST });

        // Try to retrieve the token from localStorage first, then fallback to cookies
        const accessToken = localStorage.getItem('accessToken') || Cookies.get('token');
        console.log('Access token retrieved: employee', accessToken);

        if (!accessToken) {
            throw new Error("Access token not found");
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        const { data } = await api.get("/employee/getUser", config);
        // console.log('API response:', data);

        dispatch({
            type: LOAD_EMPLOYEE_SUCCESS,
            payload: data
        });

    } catch (error) {
        // console.error('Error:', error);
        dispatch({
          type: LOAD_EMPLOYEE_FAIL,
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

