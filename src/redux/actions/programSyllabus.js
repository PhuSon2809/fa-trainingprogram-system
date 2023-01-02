import Swal from "sweetalert2";
import axiosClient from "~/apis/axiosClient";
import { getListTrainingProgram } from "./trainingProgram";
import { PROGRAM_SYLLABUS } from "./types";

export const getSyllabusByKeyword = (keyword) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .getByUrl(`/program_syllabus/syllabuses/search/${keyword}`)
        .then((response) => {
          if (response) {
            dispatch(setSyllabuses(response.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const getListProgramSyllabusDraft = () => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .getByUrl(`/program_syllabus/drafts`)
        .then((response) => {
          if (response) {
            dispatch(setListProgramSyllabusDraft(response.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const getProgramSyllabusDetailDraft = (programID) => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .getByUrl(`/program_syllabus/drafts/${programID}`)
        .then((response) => {
          if (response) {
            dispatch(setProgramSyllabusToSaveComplete(response.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const importNewProgramSyllabus = (params) => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    const filter = { page: 1, limit: 10 };
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .post(`/program_syllabus/file/import`, params)
        .then((response) => {
          if (response) {
            dispatch(getListTrainingProgram(filter));
            Swal.fire({
              icon: "success",
              title: "Import training program successfully.",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Import training program fail! Not found Syllabus!",
          });
        });
    }
  };
};
export const createNewProgramSyllabusDraft = (params) => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .post(`/program_syllabus/draft-program`, params)
        .then((response) => {
          if (response) {
            console.log("Created success");
            // dispatch(getProgramSyllabusDetail(programID));
            Swal.fire({
              icon: "success",
              title: "Create training program draft successfully.",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  };
};

export const createNewProgramSyllabusComplete = (params, programID) => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .post(`/program_syllabus/complete-program`, params)
        .then((response) => {
          if (response) {
            dispatch(getProgramSyllabusDetailDraft(programID));
            Swal.fire({
              icon: "success",
              title: "Create training program successfully.",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  };
};

export const duplicateProgramSyllabus = (params) => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    const filter = { page: 1, limit: 10 };
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .post(`/program_syllabus/complete-program`, params)
        .then((response) => {
          if (response) {
            dispatch(getListTrainingProgram(filter));
            Swal.fire({
              icon: "success",
              title: "Duplicate training program successfully.",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  };
};

export const updateProgramSyllabus = (params) => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    const filter = { page: 1, limit: 10 };
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .put(`/program_syllabus/program`, params)
        .then((response) => {
          if (response) {
            dispatch(setProgramSyllabusDetail(response.data));
            dispatch(getListTrainingProgram(filter));
            Swal.fire({
              icon: "success",
              title: "Update training program successfully.",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Update training program fail!",
          });
        });
    }
  };
};

export const deleteProgramSyllabusDraft = (programID) => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .delete(`/program_syllabus/draft-programs/${programID}`)
        .then((response) => {
          if (response) {
            dispatch(setProgramSyllabusDetail(response.data));
            dispatch(getListProgramSyllabusDraft());
            Swal.fire({
              icon: "success",
              title: "Delete training program successfully.",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Delete training program fail!",
          });
        });
    }
  };
};

export const setSyllabus = (payload) => {
  return {
    type: PROGRAM_SYLLABUS.SET_SYLLABUS,
    payload,
  };
};

export const setSyllabuses = (payload) => {
  return {
    type: PROGRAM_SYLLABUS.SET_SYLLABUSES,
    payload,
  };
};

export const addSyllabusForTP = (payload) => {
  return {
    type: PROGRAM_SYLLABUS.ADD_SYLLABUS_FOR_TP,
    payload,
  };
};

export const deleteSyllabusForTP = (payload) => {
  return {
    type: PROGRAM_SYLLABUS.DELETE_SYLLABUS_FOR_TP,
    payload,
  };
};

export const updateListSyllabusForTP = (payload) => {
  return {
    type: PROGRAM_SYLLABUS.UPDATE_LIST_SYLLABUS_CHOOSE,
    payload,
  };
};

export const setProgramSyllabusDetail = (payload) => {
  return {
    type: PROGRAM_SYLLABUS.SET_PROGRAM_SYLLABUS_DETAIL,
    payload,
  };
};

export const setProgramSyllabusToSaveComplete = (payload) => {
  return {
    type: PROGRAM_SYLLABUS.SET_PROGRAM_SYLLABUS_TO_SAVE_COMPLETE,
    payload,
  };
};

export const setProgramToEditInList = (payload) => {
  return {
    type: PROGRAM_SYLLABUS.SET_PROGRAM_TO_EDIT_IN_LIST,
    payload,
  };
};

export const setProgramSyllabusToEdit = (payload) => {
  return {
    type: PROGRAM_SYLLABUS.SET_PROGRAM_SYLLABUS_TO_EDIT,
    payload,
  };
};

export const setProgramSyllabusToDuplicate = (payload) => {
  return {
    type: PROGRAM_SYLLABUS.SET_PROGRAM_SYLLABUS_TO_DUPLICATE,
    payload,
  };
};

export const clearProgramSyllabusToSaveComplete = (payload) => {
  return {
    type: PROGRAM_SYLLABUS.CLEAR_PROGRAM_SYLLABUS_TO_SAVE_COMPLETE,
    payload,
  };
};

export const setListProgramSyllabusDraft = (payload) => {
  return {
    type: PROGRAM_SYLLABUS.SET_LIST_PROGRAM_SYLLABUS_DRAFT,
    payload,
  };
};

export const setErrorMessage = (payload) => {
  return {
    type: PROGRAM_SYLLABUS.SET_ERROR_MESSAGE,
    payload,
  };
};
