import { SYLLABUS_DETAIL } from "../actions/types";

const initialState = {
  detail: {},
};

function syllabusDetailReducer(state = initialState, action) {
  switch (action.type) {
    case SYLLABUS_DETAIL.GET_SYLLABUS_DETAIL_BY_ID:
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
}

export default syllabusDetailReducer;
