const initialState = {
    loading: false,
  };
  
  const loadingReducer = (state = initialState, action) => {
    if (action.type.endsWith("_REQUEST")) {
      return { loading: true };
    }
    if (action.type.endsWith("_SUCCESS") || action.type.endsWith("_FAIL")) {
      return { loading: false };
    }
    return state;
  };
  
  export default loadingReducer;
  