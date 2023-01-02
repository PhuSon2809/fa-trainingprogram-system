import { USERINFOR } from "../actions/types";

const initialState = {
  userInformation: [],
};
function userInforReducer(state = initialState, action) {
  switch (action.type) {
    case USERINFOR.SET_LIST_USER_INFOR:
      return {
        ...state,
        userInformation: action.payload,
      };

    default:
      return state;
  }
}
export default userInforReducer;
