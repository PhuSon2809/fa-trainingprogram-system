import { call, put, debounce, takeLatest } from "redux-saga/effects";
import ImportModalAPI from "~/redux/actions/ImportModalAPI";
import AxiosError from "~/apis/axiosClient";
function* handleFetchList(action) {
  try {
    console.log(action.payload);
    const data = yield call(ImportModalAPI.search_Syllabus, action.payload);
    yield put({ type: "Fetch_Syllabus_Create_Success", payload: data.data });
  } catch (error) {
    console.log("error fetch list: ", error);
    yield put({
      type: "Fetch_Syllabus_Create_Failed",
      payload: error.response?.data
        ? error.response?.data.message
        : "Fetch List Failed!",
    });
  }
}
//

function* handleSaveSyllabus(action) {
  try {
    console.log(action.payload);
    const data = yield call(ImportModalAPI.save_Syllabus, action.payload);
    yield put({ type: "Save_Syllabus_Success", payload: data.data });
  } catch (error) {
    console.log("error save Syllabus: ", error);
    yield put({
      type: "Save_Syllabus_Failed",
      payload: "Save Syllabus Failed",
    });
  }
}
function* handleCreateByFile(action) {
  try {
    console.log(action.payload);
    const data = yield call(ImportModalAPI.post_file, action.payload);
    console.log("Result post file: ", data);
    yield put({ type: "Post_File_Syllabus_Success", payload: data.message });
  } catch (error) {
    console.log("error post file", error);
    yield put({
      type: "Post_File_Syllabus_Failed",
      payload: "Import File Failed!",
    });
  }
}

export default function* CreateSyllabusSaga() {
  yield debounce(1000, "Fetch_Syllabus_Create", handleFetchList);
  yield takeLatest("Save_Syllabus", handleSaveSyllabus);
  yield takeLatest("Create_Syllabus_List_By_File", handleCreateByFile);
}
