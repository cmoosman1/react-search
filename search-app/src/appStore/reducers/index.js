import { SET_CURRENT_USER_DATA } from "../constants/action-types";
  
  const initialState = {
    setCurrentUserData: false,
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === SET_CURRENT_USER_DATA) {
      return Object.assign({}, state, {
        setCurrentUserData: action.payload
      });
    }
    return state;
  }
  
  export default rootReducer;
  