import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import accountReducer from "./reducers/accountReducer";
import loginReducer from "./reducers/loginReducer";
import materialReducer from "./reducers/materialReducer";
import trainingProgramReducer from "./reducers/trainingProgramReducer";
import syllabusReducer from "./reducers/syllabusReducer";
import programSyllabusReducer from "./reducers/programSyllabusReducer";
import syllabusDetailReducer from "./reducers/syllabusDetailReducer";
import permissionReducer from "./reducers/permissionReducer";
import modeReduce from "./reducers/modeReduce";
import calendarReducer from "./reducers/calendarReducer";
import userInforReducer from "./reducers/userInforReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  mode: modeReduce,
  account: accountReducer,
  permission: permissionReducer,
  trainingProgram: trainingProgramReducer,
  material: materialReducer,
  syllabus: syllabusReducer,
  programSyllabus: programSyllabusReducer,
  syllabusDetail: syllabusDetailReducer,
  calendar: calendarReducer,
  userInfor: userInforReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
