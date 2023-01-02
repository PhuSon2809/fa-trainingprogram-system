import { MODE } from "../actions/types";

const MODE_TYPE = {
  CREATE: "create",
  UPDATE: "update",
  DUPLICATE: "duplicate",
};

const initState = {
  status: "",
  error: "",
};

const modeReduce = (state = initState, action) => {
  switch (action.type) {
    case MODE.SET_UPDATE:
      return {
        ...state,
        status: MODE_TYPE.UPDATE,
      };
    case MODE.SET_CREATE:
      return {
        ...state,
        status: MODE_TYPE.CREATE,
      };
    case MODE.SET_CLEAR_STATUS:
      return {
        ...state,
        status: "",
      };
    case MODE.SET_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload,
      };
    case MODE.SET_DUPLICATE:
      return {
        ...state,
        status: MODE_TYPE.DUPLICATE,
      };
    default:
      return state;
  }
};

export default modeReduce;
