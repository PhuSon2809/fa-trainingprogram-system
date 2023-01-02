import { CALENDAR } from "../actions/types";

const initState = {
  error: "",
  search: "",
  classList: [],
  classListSearch: [],
  classLocation: [],
  classStatus: [],
  classFsu: [],
  classTrainer: [],
};

const calendarReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case CALENDAR.SET_SEARCH_VALUE:
      return {
        ...state,
        search: action.payload,
      };
    case CALENDAR.SET_CLASS_LIST:
      return {
        ...state,
        classList: action.payload,
      };
    case CALENDAR.SET_CLASS_LIST_BY_KEYWORD:
      return {
        ...state,
        classListSearch: action.payload,
      };
    case CALENDAR.SET_CLASS_LOCATION:
      return {
        ...state,
        classLocation: action.payload,
      };
    case CALENDAR.SET_CLASS_STATUS:
      return {
        ...state,
        classStatus: action.payload,
      };
    case CALENDAR.SET_CLASS_FSU:
      return {
        ...state,
        classFsu: action.payload,
      };
    case CALENDAR.SET_CLASS_TRAINER:
      return {
        ...state,
        classTrainer: action.payload,
      };
    case CALENDAR.SET_CLASS_FORMAT_TYPE:
      return {
        ...state,
        formatType: action.payload,
      };
    case CALENDAR.SET_CLASS_ATTENDEE:
      return {
        ...state,
        classAttendee: action.payload,
      };
    case CALENDAR.SET_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload,
      };
    case CALENDAR.SET_CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

export default calendarReducer;
