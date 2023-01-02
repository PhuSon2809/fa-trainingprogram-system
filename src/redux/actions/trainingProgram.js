import Swal from "sweetalert2";
import axiosClient from "~/apis/axiosClient";
import {
  setProgramSyllabusToEdit,
  setProgramSyllabusToDuplicate,
} from "./programSyllabus";
import { TRAINING } from "./types";

const SUCCESS = "success";

export const getListTrainingProgram = (params) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      // console.log(params);
      axiosClient.setHeaderAuth(token);
      axiosClient
        .get2(
          `/training-program/filter?page=${params.page}&size=${params.limit}`
        )
        .then((response) => {
          if (response) {
            // console.log(mapListData(response.data));
            dispatch(
              setListTrainingProgram({
                pagination: response.pagination,
                data: mapListData(response.data),
              })
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const getListTrainingProgramBySearch = (params) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      // console.log(params);
      axiosClient.setHeaderAuth(token);
      axiosClient
        .get2(
          `/training-program/filter?page=${params.size.page}&size=${params.size.limit}&searchValue=${params.keyword}`
        )
        .then((response) => {
          if (response) {
            // console.log(mapListData(response.data));
            dispatch(
              setListTrainingProgram({
                pagination: response.pagination,
                data: mapListData(response.data),
              })
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

function mapListData(data) {
  let count = 0;
  const result = data.map((element) => {
    count++;
    const programObj = {
      id: count,
      programId: element.id,
      programName: element.name,
      createdBy: element.createdBy,
      createdOn: element.createdDate,
      duration: element.duration + " days",
      status: element.status,
    };
    return programObj;
  });
  return result.filter((p) => p !== undefined);
}

export const getFileDownload = () => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .getByUrl(`/program_syllabus/file/download`)
        .then((response) => {
          if (response) {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "TrainingProgramTemplate.xlsx");
            document.body.appendChild(link);
            link.click();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const getTrainingProgramDetail = (programID) => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .getByUrl(`/training-program/${programID}`)
        .then((response) => {
          if (response) {
            console.log(response.data);
            dispatch(setTrainingProgramDetail(response.data));
            dispatch(setProgramSyllabusToEdit(response.data));
            dispatch(setTrainingProgramName(response.data.name));
            dispatch(setErrorMessage(SUCCESS));
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setErrorMessage("fail"));
        });
    }
  };
};

export const updateStatusTrainingProgram = (programID, params) => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .put(`/training-program/status`, params)
        .then((response) => {
          if (response) {
            dispatch(getTrainingProgramDetail(programID));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const updateStatusTrainingProgramInList = (params, filter) => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .put(`/training-program/status`, params)
        .then((response) => {
          if (response) {
            dispatch(getListTrainingProgram(filter));
            Swal.fire({
              icon: "success",
              title: "Update status training program successfully.",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Update status training program fail!",
          });
        });
    }
  };
};

export const deleteTrainingProgram = (programID) => {
  console.log("programID", programID);
  return async (dispatch) => {
    const token = axiosClient.getToken();
    const filter = { page: 1, limit: 10 };
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .delete(`/training-program/${programID}`)
        .then((response) => {
          if (response) {
            dispatch(setTrainingProgramDetail(response.data));
            dispatch(getListTrainingProgram(filter));
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

export const duplicateTrainingProgram = (id) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    const filter = { page: 1, limit: 10 };
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .getByUrl(`/program_syllabus/programs/${id}`)
        .then((response) => {
          if (response) {
            dispatch(setTrainingProgramName(response.data.name));
            dispatch(setProgramSyllabusToDuplicate(response.data));
            dispatch(getListTrainingProgram(filter));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const setListTrainingProgram = (payload) => {
  return {
    type: TRAINING.SET_LIST_TRAINING_PROGRAM,
    payload,
  };
};

export const setTrainingProgramDetail = (payload) => {
  return {
    type: TRAINING.SET_TRAINING_PROGRAM_DETAIL,
    payload,
  };
};

export const setTrainingProgramName = (payload) => {
  return {
    type: TRAINING.SAVE_TP_NAME,
    payload,
  };
};

export const importTP = (payload) => {
  return {
    type: TRAINING.IMPORT_TP,
    payload,
  };
};

export const setErrorMessage = (payload) => {
  return {
    type: TRAINING.SET_ERROR_MESSAGE,
    payload,
  };
};
