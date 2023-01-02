import { SYLLABUS } from "../actions/types";

const initialState = {
  syllabusList: [],
  status: "",
  message: "",
  mode: "create",
  syllabusItem: {},
  draft: [],
  level: [],
  delivery: [],
  outputStandard: [],
  idSyllabusEdit: "",
  listSuggestSyllabus: [],
  searchValue: [],
  loading: false,
};

function syllabusReducer(state = initialState, action) {
  switch (action.type) {
    case SYLLABUS.SET_LIST_SYLLABUS:
      return {
        ...state,
        syllabusList: action.payload,
      };
    case SYLLABUS.GET_LIST_SYLLABUS_BY_SEARCH:
      return {
        ...state,
        syllabusList: action.payload,
      };
    case SYLLABUS.GET_LIST_SYLLABUS_BY_DATE:
      return {
        ...state,
        syllabusList: action.payload,
      };
    case SYLLABUS.SORT_SYLLABUS:
      return {
        ...state,
        syllabusList: action.payload,
      };
    case SYLLABUS.DELETE_SYLLABUS:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
      };

    case SYLLABUS.CHANGE_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case SYLLABUS.GET_SYLLABUS_ITEM:
      return {
        ...state,
        syllabusItem: action.payload,
      };
    case SYLLABUS.SET_DRAFT:
      return {
        ...state,
        draft: action.payload,
      };
    case SYLLABUS.SET_LEVEL:
      return {
        ...state,
        level: action.payload,
      };
    case SYLLABUS.SET_DELIVERY:
      return {
        ...state,
        delivery: action.payload,
      };
    case SYLLABUS.SET_OUTPUT_STANDARD:
      return {
        ...state,
        outputStandard: action.payload,
      };

    case SYLLABUS.GET_ID_SYLLABUS_EDIT: {
      return {
        ...state,
        idSyllabusEdit: action.payload,
      };
    }
    case SYLLABUS.GET_LIST_SUGGEST_SYLLABUS: {
      return {
        ...state,
        listSuggestSyllabus: action.payload,
      };
    }
    case SYLLABUS.GET_SEARCH_VALUE: {
      return {
        ...state,
        searchValue: action.payload,
      };
    }
    case SYLLABUS.SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    default:
      return state;
  }
}

export default syllabusReducer;
