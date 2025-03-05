import { getAccessToken, setAccessToken } from '../utility/tokenUtils';
import Cookies from 'js-cookie';
import { ADMIN_FORGOTPASSWORD_FAIL, ADMIN_FORGOTPASSWORD_REQUEST, ADMIN_FORGOTPASSWORD_SUCCESS, ADMIN_LOGIN_FAIL, ADMIN_LOGIN_SUCCESS, ADMIN_SIGNUP_FAIL, ADMIN_SIGNUP_REQUEST, ADMIN_SIGNUP_SUCCESS, GET_ADMIN_FAIL, GET_ADMIN_REQUEST, GET_ADMIN_SUCCESS, GET_REPORT_FAIL, GET_REPORT_REQUEST, GET_REPORT_SUCCESS, LOAD_ADMIN_FAIL, LOAD_ADMIN_REQUEST, LOAD_ADMIN_SUCCESS, REPORT_GENERATE_FAIL, REPORT_GENERATE_REQUEST, REPORT_GENERATE_SUCCESS } from '../constants/userConstants';
import api from '../utility/api';

export const getAdminDetails = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ADMIN_REQUEST });
  
      const token = localStorage.getItem('accessToken'); // Adjust if using a different token key
      if (!token) {
        throw new Error('Token not found');
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const {data} = await api.get("/admin/getAdminDetails", config); // Adjust the endpoint if necessary
      console.log("Get user : ", data);
      
      dispatch({
        type: GET_ADMIN_SUCCESS,
        payload: data,
      });
  
    } catch (error) {
      dispatch({
        type: GET_ADMIN_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const register = (formData) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_SIGNUP_REQUEST });

        const response =await api.post("/admin/register", formData, {
            headers: {
                "Content-Type" :"multipart/form-data",
            }
        });

        dispatch({
            type: ADMIN_SIGNUP_SUCCESS,
            payload: response.data
        });
        return response;

    } catch (error) {
        dispatch({
            type: ADMIN_SIGNUP_FAIL,
            payload: error.response.data.message || error.message
        });
        throw error;
    }
};

export const login = (credentials) => async (dispatch) => {
    try {
        const response = await api.post("/admin/login", credentials);
        const { tokens } = response.data; // Adjust based on your response structure
        const { accessToken } = tokens; // Extract the access token

        if (!accessToken) {
            throw new Error('Access token not found');
        }
        
        // Save token in cookies
        Cookies.set('token', accessToken, { expires: 7, path: '/' }); // Token will be stored for 7 days
        dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: response.data });
        return response;
    } catch (error) {
        dispatch({ type: ADMIN_LOGIN_FAIL, payload: error.response?.data?.message || error.message });
        throw error;
    }
};

export const forgetPassword = (userData) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_FORGOTPASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await api.post('/admin/forgetPassword', userData, config);

        dispatch({
            type: ADMIN_FORGOTPASSWORD_SUCCESS,
            payload: response.data
        });
        return response;

    } catch (error) {
        dispatch({
            type: ADMIN_FORGOTPASSWORD_FAIL,
            payload: error.response.data.message || error.message,
        });
        throw error;
    }
};

export const loadAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_ADMIN_REQUEST });

        // Try to retrieve the token from localStorage first, then fallback to cookies
        const accessToken = localStorage.getItem('accessToken') || Cookies.get('token');
        console.log('Access token retrieved:', accessToken);

        if (!accessToken) {
            throw new Error("Access token not found");
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        const { data } = await api.get("/admin/getAdmin", config);
        // console.log('API response:', data);

        dispatch({
            type: LOAD_ADMIN_SUCCESS,
            payload: data
        });

    } catch (error) {
        // console.error('Error while fatching load admin:', error);
        dispatch({
          type: LOAD_ADMIN_FAIL,
          payload: error.response?.data?.message || error.message,
        });
      }
      
};

export const generateReport = (credentials) => async (dispatch) => {
    try {
        dispatch({ type: REPORT_GENERATE_REQUEST });

        const response =await api.post("/report/generateReport", credentials);

        dispatch({
            type: REPORT_GENERATE_SUCCESS,
            payload: response.data
        });
        return response;

    } catch (error) {
        dispatch({
            type: REPORT_GENERATE_FAIL,
            payload: error.response.data.message || error.message
        });
        throw error;
    }
};

export const getReport = () => async (dispatch) => {
  try {
    dispatch({ type: GET_REPORT_REQUEST });

    const accessToken = localStorage.getItem('accessToken') || Cookies.get('token');
    console.log('Access token retrieved:', accessToken);

    if (!accessToken) {
        throw new Error("Access token not found");
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };

    const { data } = await api.get('/report/getReport', config);

    dispatch({
      type: GET_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error('Error fetching report:', error);
    dispatch({
      type: GET_REPORT_FAIL,
      payload: error.response?.data?.message || error.message || 'Something went wrong!',
    });
  }
};
