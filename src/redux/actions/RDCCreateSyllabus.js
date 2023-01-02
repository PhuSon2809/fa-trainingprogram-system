const initialState = {
  data: [],
  loading: false,
  loadingSearch: false,
  errorFetchList: "",
  dataSearch: [],
  errMes: "",
  message: "",
  errorImport: false,
};
//
const CreateSyllabusReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "Fetch_Syllabus_Create":
      return {
        ...state,
        loadingSearch: true,
      };
    case "Fetch_Syllabus_Create_Success":
      return {
        ...state,
        loadingSearch: false,
        data: payload,
      };
    case "Fetch_Syllabus_Create_Failed":
      return {
        ...state,
        loadingSearch: false,
        errMes: payload,
      };
    case "Post_File_Syllabus_Success":
      return {
        ...state,
        errorImport: false,
        message: payload,
      };

    default:
      return state;
  }
};
export default CreateSyllabusReducer;
//
