import axiosClient from "~/apis/axiosClient";
import { TRAINING } from "../actions/types";
import StorageKeys from "../constants/storage-keys";

const token = axiosClient.getToken();
let newTrainingProgramName = "";
if (token) {
  newTrainingProgramName = JSON.parse(
    localStorage.getItem(StorageKeys.NEW_TRAINING_PROGRAM_NAME)
  );
}

const initState = {
  error: "",
  listTrainingProgram: [],
  trainingProgram: "",
  newTrainingProgramName: newTrainingProgramName,

  dataEncodingType: [
    { id: "0", label: "Auto detect" },
    { id: "1", label: "1" },
    { id: "2", label: "2" },
  ],
  dataColumnSeperator: [
    { id: "0", label: "Comma" },
    { id: "1", label: "1" },
    { id: "2", label: "2" },
  ],
  dataScanning: [
    { label: "Program ID", value: "0" },
    { label: "Program name", value: "1" },
  ],
  dataDuplicate: [
    { id: "0", label: "Allow" },
    { id: "1", label: "Replace" },
    { id: "2", label: "Skip" },
  ],
  valuesImport: [],
};

const trainingProgramReducer = (state = initState, action) => {
  switch (action.type) {
    case TRAINING.SET_LIST_TRAINING_PROGRAM:
      return {
        ...state,
        listTrainingProgram: action.payload,
      };
    case TRAINING.SET_TRAINING_PROGRAM_DETAIL:
      return {
        ...state,
        trainingProgram: action.payload,
      };
    case TRAINING.SAVE_TP_NAME:
      localStorage.setItem(
        StorageKeys.NEW_TRAINING_PROGRAM_NAME,
        JSON.stringify(action.payload)
      );
      return {
        ...state,
        newTrainingProgramName: action.payload,
      };
    case TRAINING.IMPORT_TP:
      return {
        ...state,
        valuesImport: action.payload,
      };
      case TRAINING.SET_ERROR_MESSAGE:
        return {
          ...state,
          error: action.payload,
        };
      case TRAINING.SET_CLEAR_ERROR_MESSAGE:
        return {
          ...state,
          error: "",
        };
    default:
      return state;
  }
};

export default trainingProgramReducer;
