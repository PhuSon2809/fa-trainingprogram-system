import { ACCOUNT } from "../actions/types";

const initState = {
  error: "",
  statusError: 0,
  role: "",
  account: "",
  accounts: [],
};

const accountReducer = (state = initState, action) => {
  switch (action.type) {
    case ACCOUNT.SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
      };
    case ACCOUNT.SET_ACCOUNT:
      return {
        ...state,
        role: action.payload.role,
        account: action.payload,
      };
    case ACCOUNT.SET_ERROR_STATUS:
      return {
        ...state,
        statusError: action.payload,
      };
    case ACCOUNT.SET_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload,
      };
    case ACCOUNT.SET_CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

export default accountReducer;
