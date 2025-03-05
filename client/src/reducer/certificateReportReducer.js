import { 
    GET_CERTIFICATE_FAIL, 
    GET_CERTIFICATE_REQUEST, 
    GET_CERTIFICATE_SUCCESS,
    
} from "../constants/userConstants";



export const getCertificateReducer = (state = {certificateDetail : {}}, action) => {
  switch (action.type) {

      case GET_CERTIFICATE_REQUEST:
          return {
              ...state,
              loading : true,
          }
      
      case GET_CERTIFICATE_SUCCESS:
          return {
              ...state,
              loading : false,
              certificateDetail : action.payload
          }
      
      case GET_CERTIFICATE_FAIL:
          return {
              ...state,
              loading : false,
              certificateDetail : null,
              error : action.payload
      }
      
      default:
          return state;
  }
}