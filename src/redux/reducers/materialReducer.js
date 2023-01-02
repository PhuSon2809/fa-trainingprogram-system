import { MATERIAL } from "../actions/types";

const initState = {
  error: "",
  role: "",
  material: "",
  materials: [],
  files: [],
  data: {},
};

const materialReducer = (state = initState, action) => {
  switch (action.type) {
    case MATERIAL.SET_MATERIALS:
      return {
        ...state,
        materials: action.payload,
      };
    case MATERIAL.SET_MATERIAL:
      return {
        ...state,
        material: action.payload,
      };
    case MATERIAL.SET_FILES:
      return {
        ...state,
        files: action.payload,
      };
    case MATERIAL.SET_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload,
      };
    case MATERIAL.SET_CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: "",
      };
    case MATERIAL.UPLOAD_MATERIAL:
      return {
        ...state,
        data: action.payload,
      };
    case MATERIAL.GET_MATERIAL:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default materialReducer;
