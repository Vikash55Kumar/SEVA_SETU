import { 
    GET_CERTIFICATE_FAIL, 
    GET_CERTIFICATE_REQUEST, 
    GET_CERTIFICATE_SUCCESS,

    REGISTER_CERTIFICATE_FAIL,
    REGISTER_CERTIFICATE_REQUEST,
    REGISTER_CERTIFICATE_SUCCESS,

    UPDATE_CERTIFICATE_STATUS_FAIL,
    UPDATE_CERTIFICATE_STATUS_REQUEST,
    UPDATE_CERTIFICATE_STATUS_SUCCESS,

} from "../constants/userConstants";
import api from "../utility/api";

export const registerCertificate = (formData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_CERTIFICATE_REQUEST });

        const response =await api.post("/certificate/registrCertificate", formData, {
            headers: {
                "Content-Type" :"multipart/form-data",
            }
        });
        
        const {data} = response

        dispatch({
            type: REGISTER_CERTIFICATE_SUCCESS,
            payload: data.data
        });
        return data;

    } catch (error) {
        dispatch({
            type: REGISTER_CERTIFICATE_FAIL,
            payload: error.response.data.message || error.message
        });
        throw error;
    }
};

export const updateCertificateVerification = (formData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CERTIFICATE_STATUS_REQUEST });

        const response = await api.post('/certificate/updateCertificateVerification', formData, {
            headers: {
                "Content-Type" :"multipart/form-data",
            }
        });
        // console.log(response);
        
        dispatch({
            type: UPDATE_CERTIFICATE_STATUS_SUCCESS,
            payload: response.data
        });
        return response;

    } catch (error) {
        dispatch({
            type: UPDATE_CERTIFICATE_STATUS_FAIL,
            payload: error.response.data.message || error.message,
        });
        throw error;
    }
};

export const getCertificateDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CERTIFICATE_REQUEST });

    const { data } = await api.get('/certificate/getCertificateDetails');

    dispatch({
      type: GET_CERTIFICATE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: GET_CERTIFICATE_FAIL,
      payload: error.response?.data?.message || error.message || 'Something went wrong!',
    });
  }
};

// export const generateReport = (credentials) => async (dispatch) => {
//     try {
//         dispatch({ type: REPORT_GENERATE_REQUEST });

//         const response =await api.post("/report/generateReport", credentials);

//         dispatch({
//             type: REPORT_GENERATE_SUCCESS,
//             payload: response.data
//         });
//         return response;

//     } catch (error) {
//         dispatch({
//             type: REPORT_GENERATE_FAIL,
//             payload: error.response.data.message || error.message
//         });
//         throw error;
//     }
// };

// export const getReport = () => async (dispatch) => {
//   try {
//     dispatch({ type: GET_REPORT_REQUEST });

//     const accessToken = localStorage.getItem('accessToken') || Cookies.get('token');
//     console.log('Access token retrieved:', accessToken);

//     if (!accessToken) {
//         throw new Error("Access token not found");
//     }

//     const config = {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`
//         }
//     };

//     const { data } = await api.get('/report/getReport', config);

//     dispatch({
//       type: GET_REPORT_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     // console.error('Error fetching report:', error);
//     dispatch({
//       type: GET_REPORT_FAIL,
//       payload: error.response?.data?.message || error.message || 'Something went wrong!',
//     });
//   }
// };