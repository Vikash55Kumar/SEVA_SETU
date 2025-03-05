import {
  ADMIN_FORGOTPASSWORD_FAIL,
  ADMIN_FORGOTPASSWORD_REQUEST,
  ADMIN_FORGOTPASSWORD_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_SIGNUP_FAIL,
  ADMIN_SIGNUP_REQUEST,
  ADMIN_SIGNUP_SUCCESS,
  GET_ADMIN_FAIL,
  GET_ADMIN_REQUEST,
  GET_ADMIN_SUCCESS,
  GET_REPORT_FAIL,
  GET_REPORT_REQUEST,
  GET_REPORT_SUCCESS,
  LOAD_ADMIN_FAIL,
  LOAD_ADMIN_REQUEST,
  LOAD_ADMIN_SUCCESS,
} from "../constants/userConstants";

const initialState = {
  report: {
    data: [],  // Initialize it as an empty array or any default value
  },
  loading: false,
  error: null,
};

export const reportReducer = (state = initialState, action) => {
  switch (action.type) {

      case GET_REPORT_REQUEST:
          return {
              ...state,
              loading : true,
          }
      
      case GET_REPORT_SUCCESS:
          return {
              ...state,
              loading : false,
              report : action.payload
          }
      
      case GET_REPORT_FAIL:
          return {
              ...state,
              loading : false,
              report : null,
              error : action.payload
      }
      
          
  
      default:
          return state;
  }
}

export const adminReducer = (state = { admin: {} }, action) => {
  switch (action.type) {
    case ADMIN_SIGNUP_REQUEST:
    case ADMIN_LOGIN_REQUEST:
    case LOAD_ADMIN_REQUEST:
    case ADMIN_FORGOTPASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };

    case ADMIN_LOGIN_SUCCESS:
    case LOAD_ADMIN_SUCCESS:
    case ADMIN_FORGOTPASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        admin: action.payload,
      };
    case ADMIN_SIGNUP_FAIL:
    case ADMIN_LOGIN_FAIL:
    case ADMIN_FORGOTPASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        admin: null,
        error: action.payload,
      };

    case ADMIN_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        admin: action.payload,
      };

    case LOAD_ADMIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        admin: null,
        error: action.payload,
      };

    case GET_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        admin: action.payload,
      };

    case GET_ADMIN_FAIL:
      return {
        ...state,
        loading: false,
        admin: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

