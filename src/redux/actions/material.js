import axios from "axios";
import Swal from "sweetalert2";
import axiosClient from "~/apis/axiosClient";
import { getTrainingProgramDetail } from "./trainingProgram";
import { MATERIAL } from "./types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifyFail = (func) =>
  toast.error(func, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });

const notifySuccess = (func) =>
  toast.success(func, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });

export const createNewMaterial = (formData, chapterId, programID) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axios({
        method: "post",
        url: `http://ec2-13-212-157-122.ap-southeast-1.compute.amazonaws.com/api/v1/material`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          if (response) {
            dispatch(getTrainingProgramDetail(programID));
            Swal.fire({
              icon: "success",
              title: "Create material successfully.",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Create material fail!",
          });
        });
    }
  };
};

export const updateMaterial = (formData, materialId, programID) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axios({
        method: "put",
        url: `http://ec2-13-212-157-122.ap-southeast-1.compute.amazonaws.com/api/v1/material`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          if (response) {
            dispatch(getTrainingProgramDetail(programID));
            Swal.fire({
              icon: "success",
              title: "Update material successfully.",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Update material fail!",
          });
        });
    }
  };
};

export const deleteMaterial = (materialId, programID) => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .delete(`/material/${materialId}`)
        .then((response) => {
          if (response) {
            dispatch(getTrainingProgramDetail(programID)).then(
              Swal.fire({
                icon: "success",
                title: "Delete material successfully.",
              })
            );
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Delete material fail!",
          });
        });
    }
  };
};

export const downloadFileMaterial = (materialId) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .getWithId(`/material/downloadFile/${materialId}`)
        .then((response) => {
          if (response) {
            console.log(response);
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Lesson4.2_Working with Mobile.pptx");
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

export const setMaterial = (payload) => {
  return {
    type: MATERIAL.SET_MATERIAL,
    payload,
  };
};

export const setMaterials = (payload) => {
  return {
    type: MATERIAL.SET_MATERIALS,
    payload,
  };
};

export const setFiles = (payload) => {
  return {
    type: MATERIAL.SET_FILES,
    payload,
  };
};

//
export const getAMaterial = (id) => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .get3(`/material/${id}`, { responseType: "blob" })
        .then((response) => {
          if (response) {
            dispatch(setGetAMaterial({ id, response }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const uploadAMaterial = (data) => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .post(`/material/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response) {
            dispatch(setUploadAMaterial(response));
            notifySuccess("Uploaded");
          }
        })
        .catch((error) => {
          console.log(error);
          notifyFail("Failed to upload");
        });
    }
  };
};

export const deleteAMaterial = (materialID) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .delete2(`/material/${materialID}`)
        .then((response) => {
          if (response) {
            dispatch(setDeleteAMaterial(response));
            notifySuccess("Deleted");
          }
        })
        .catch((error) => {
          console.log(error);
          notifyFail("Failed to delete");
        });
    }
  };
};

export const updateAMaterial = (data) => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .put(`/material/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response) {
            dispatch(setUpdateAMaterial(response));
            notifySuccess("Updated");
          }
        })
        .catch((error) => {
          console.log(error);
          notifyFail("Fail to update");
        });
    }
  };
};

export const setGetAMaterial = (payload) => {
  return {
    type: MATERIAL.GET_MATERIAL,
    payload,
  };
};

export const setUploadAMaterial = (payload) => {
  return {
    type: MATERIAL.UPLOAD_MATERIAL,
    payload,
  };
};

export const setDeleteAMaterial = (payload) => {
  return {
    type: MATERIAL.DELETE_MATERIAL,
    payload,
  };
};

export const setUpdateAMaterial = (payload) => {
  return {
    type: MATERIAL.UPLOAD_MATERIAL,
    payload,
  };
};
