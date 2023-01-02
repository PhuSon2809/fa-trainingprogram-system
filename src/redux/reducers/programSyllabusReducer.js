import { PROGRAM_SYLLABUS } from "../actions/types";

const initState = {
  error: "",
  syllabus: "",
  syllabuses: [],
  listSyllabusChoose: [],
  programSyllabusDetail: "",
  listProgramSyllabusDraft: [],
  listProgramSyllabusComplete: [],
  programSyllabusToEdit: "",
};

const programSyllabusReducer = (state = initState, action) => {
  switch (action.type) {
    case PROGRAM_SYLLABUS.SET_SYLLABUS:
      return {
        ...state,
        syllabus: action.payload,
      };
    case PROGRAM_SYLLABUS.SET_SYLLABUSES:
      return {
        ...state,
        syllabuses: action.payload,
      };
    case PROGRAM_SYLLABUS.ADD_SYLLABUS_FOR_TP:
      return {
        ...state,
        listSyllabusChoose: [...state.listSyllabusChoose, action.payload],
      };
    case PROGRAM_SYLLABUS.DELETE_SYLLABUS_FOR_TP:
      let index = state.listSyllabusChoose
        .map(function (e) {
          return e.id;
        })
        .indexOf(action.payload);
      const newArr = [...state.listSyllabusChoose];
      newArr.splice(index, 1);

      return {
        ...state,
        listSyllabusChoose: newArr,
      };
    case PROGRAM_SYLLABUS.UPDATE_LIST_SYLLABUS_CHOOSE:
      return {
        ...state,
        listSyllabusChoose: action.payload,
      };
    case PROGRAM_SYLLABUS.SET_PROGRAM_SYLLABUS_DETAIL:
      return {
        ...state,
        programSyllabusDetail: action.payload,
      };
    case PROGRAM_SYLLABUS.SET_PROGRAM_TO_EDIT_IN_LIST:
      return {
        ...state,
        programSyllabusToEdit: action.payload,
      };
    case PROGRAM_SYLLABUS.SET_PROGRAM_SYLLABUS_TO_EDIT:
      return {
        ...state,
        listSyllabusChoose: action.payload.syllabusOfProgramDTOList,
        programSyllabusToEdit: action.payload,
      };
    case PROGRAM_SYLLABUS.SET_PROGRAM_SYLLABUS_TO_DUPLICATE:
      return {
        ...state,
        listSyllabusChoose: action.payload.syllabuses,
        programSyllabusToEdit: action.payload,
      };
    case PROGRAM_SYLLABUS.SET_PROGRAM_SYLLABUS_TO_SAVE_COMPLETE:
      return {
        ...state,
        listSyllabusChoose: action.payload.syllabuses,
        programSyllabusToEdit: action.payload,
      };
    case PROGRAM_SYLLABUS.CLEAR_PROGRAM_SYLLABUS_TO_SAVE_COMPLETE:
      return {
        ...state,
        listSyllabusChoose: [],
        programSyllabusToEdit: "",
      };
    case PROGRAM_SYLLABUS.SET_LIST_PROGRAM_SYLLABUS_DRAFT:
      return {
        ...state,
        listProgramSyllabusDraft: action.payload,
      };
    case PROGRAM_SYLLABUS.SET_LIST_PROGRAM_SYLLABUS_COMPLETE:
      return {
        ...state,
        listProgramSyllabusComplete: action.payload,
      };
    case PROGRAM_SYLLABUS.SET_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload,
      };
    case PROGRAM_SYLLABUS.SET_CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

export default programSyllabusReducer;
