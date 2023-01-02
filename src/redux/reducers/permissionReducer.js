import { PERMISSION } from "../actions/types";

const initState = {
  error: "",
  permission: "",
  permissions: [],
};

const permissionReducer = (state = initState, action) => {
  switch (action.type) {
    case PERMISSION.SET_PERMISSIONS:
      return {
        ...state,
        PERMISSIONs: action.payload,
      };
    case PERMISSION.SET_PERMISSION:
      return {
        ...state,
        PERMISSION: action.payload,
      };
    case PERMISSION.SET_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload,
      };
    case PERMISSION.SET_CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

export default permissionReducer;
