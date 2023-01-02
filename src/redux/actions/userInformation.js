import axiosClient from "~/apis/axiosClient";
import { USERINFOR } from "./types";
import Swal from "sweetalert2";

export const getUserInformation = () => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .get(`/users/profile`)
        .then((response) => {
          if (response) {
            console.log(response);
            dispatch(setUserProfile(response.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};
export const putUserInformation = (params) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .put(`/users/profile`, params)
        .then((response) => {
          if (response) {
            console.log(response);
            if (response) {
              console.log(response);
              Swal.fire(
                "Update success!",
                "Your information have been update.",
                "success"
              ).then(() => {
                dispatch(getUserInformation(response.data));
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Update information fail!",
          });
        });
    }
  };
};
export const putUserInformationImg = (params) => {
  console.log(params);
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .put(`/users/profile/image`, params)
        .then((response) => {
          if (response) {
            console.log(response);
            if (response) {
              console.log(response);
              Swal.fire(
                "Update success!",
                "Your image have been update.",
                "success"
              ).then(() => {
                dispatch(getUserInformation(response.data));
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Update image fail!",
          });
        });
    }
  };
};
export const setUserProfile = (payload) => {
  return {
    type: USERINFOR.SET_LIST_USER_INFOR,
    payload,
  };
};
