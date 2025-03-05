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
    
} from "../constants/userConstants"

export const getUserReducer = (state = {userDetail : {}}, action) => {
  switch (action.type) {

      case GET_USER_REQUEST:
          return {
              ...state,
              loading : true,
          }
      
      case GET_USER_SUCCESS:
          return {
              ...state,
              loading : false,
              userDetail : action.payload
          }
      
      case GET_USER_FAIL:
          return {
              ...state,
              loading : false,
              userDetail : null,
              error : action.payload
      }
      
      default:
          return state;
  }
}

export const userReducer = (state = {user : {}}, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
        case USER_LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
        case FORGOTPASSWORD_REQUEST:
            return {
                ...state,
                loading : true,
                isAuthenticated: false,
            }

        case USER_LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
        case FORGOTPASSWORD_SUCCESS:
            return {
                ...state,
                loading : false,
                isAuthenticated: true,
                user : action.payload
            };
        case USER_SIGNUP_FAIL:
        case USER_LOGIN_FAIL:
        case FORGOTPASSWORD_FAIL:
            return {
                ...state,
                loading : false,
                isAuthenticated: false,
                user:null,
                error: action.payload,
            };

        case USER_SIGNUP_SUCCESS:
            return {
                ...state,
                loading : false,
                isAuthenticated: false,
                user : action.payload
            };
        
        case LOAD_USER_FAIL:
            return {
                ...state,
                loading : false,
                isAuthenticated: false,
                user:null,
                error: action.payload,
            }
        
        default:
            return state;
    }
}

export default userReducer;