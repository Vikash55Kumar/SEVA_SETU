import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    
    SIGNUP_REQUEST, 
    SIGNUP_SUCCESS, 
    SIGNUP_FAIL, 

    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    CLEAR_ERRORS,
    LOGOUT_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    
    FORGOTPASSWORD_REQUEST,
    FORGOTPASSWORD_SUCCESS,
    FORGOTPASSWORD_FAIL,

    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_FAIL,
    
} from "../constants/userConstants"

export const userReducer = (state = {user : {}}, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case GOOGLE_LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
        case FORGOTPASSWORD_REQUEST:
            return {
                ...state,
                loading : true,
                isAuthenticated: false,
            }

        case LOGIN_SUCCESS:
        case GOOGLE_LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
        case FORGOTPASSWORD_SUCCESS:
        case LOGOUT_FAIL:
        case USER_LOADED:
            return {
                ...state,
                loading : false,
                isAuthenticated: true,
                user : action.payload
            };
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case GOOGLE_LOGIN_FAIL:
        case FORGOTPASSWORD_FAIL:
            return {
                ...state,
                loading : false,
                isAuthenticated: false,
                user:null,
                error: action.payload,
            };

        case AUTH_ERROR:
        case SIGNUP_SUCCESS:
        case LOGOUT_SUCCESS:
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
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        
        case GET_USER_REQUEST:
            return {
                ...state,
                loading : true,
            }
        
        case GET_USER_SUCCESS:
            return {
                ...state,
                loading : false,
                user : action.payload
            }
        
        case GET_USER_FAIL:
            return {
                ...state,
                loading : false,
                user : null,
                error : action.payload
        }
        
            
    
        default:
            return state;
    }
}

export default userReducer;