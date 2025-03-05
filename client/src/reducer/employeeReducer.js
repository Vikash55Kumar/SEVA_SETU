import {

    SIGNUP_REQUEST, 
    SIGNUP_SUCCESS, 
    SIGNUP_FAIL, 

    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,

    CLEAR_ERRORS,
    LOGOUT_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,

    AUTH_ERROR,
    
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
    
} from "../constants/userConstants"



export const getEmployeeReducer = (state = {employeeDetail : {}}, action) => {
  switch (action.type) {

      case GET_EMPLOYEE_DETAIL_REQUEST:
          return {
              ...state,
              loading : true,
          }
      
      case GET_EMPLOYEE_DETAIL_SUCCESS:
          return {
              ...state,
              loading : false,
              employeeDetail : action.payload
          }
      
      case GET_EMPLOYEE_DETAIL_FAIL:
          return {
              ...state,
              loading : false,
              employeeDetail : null,
              error : action.payload
      }
      
      default:
          return state;
  }
}

export const employeeReducer = (state = {employee : {}}, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case GOOGLE_LOGIN_REQUEST:
        case LOAD_EMPLOYEE_REQUEST:
        case FORGOTPASSWORD_REQUEST:
            return {
                ...state,
                loading : true,
                isAuthenticated: false,
            }

        case LOGIN_SUCCESS:
        case GOOGLE_LOGIN_SUCCESS:
        case LOAD_EMPLOYEE_SUCCESS:
        case FORGOTPASSWORD_SUCCESS:
        case LOGOUT_FAIL:
            return {
                ...state,
                loading : false,
                isAuthenticated: true,
                employee : action.payload
            };
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case GOOGLE_LOGIN_FAIL:
        case FORGOTPASSWORD_FAIL:
            return {
                ...state,
                loading : false,
                isAuthenticated: false,
                employee:null,
                error: action.payload,
            };

        case AUTH_ERROR:
        case SIGNUP_SUCCESS:
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading : false,
                isAuthenticated: false,
                employee : action.payload
            };
        
        case LOAD_EMPLOYEE_FAIL:
            return {
                ...state,
                loading : false,
                isAuthenticated: false,
                employee:null,
                error: action.payload,
            }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        
    
        default:
            return state;
    }
}

// export default userReducer;