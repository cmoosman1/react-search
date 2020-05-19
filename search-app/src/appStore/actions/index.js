import {
    SET_CURRENT_USER_DATA
  } from "../constants/action-types.js";
  
  export function setCurrentUserData(payload) {
    return { type: SET_CURRENT_USER_DATA, payload };
  }

