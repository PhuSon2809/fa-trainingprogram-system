import Swal from "sweetalert2";
import axiosClient from "~/apis/axiosClient";
import StorageKeys from "../constants/storage-keys";
import { LOGIN } from "./types";

const SUCCESS = "success";

export const login = (params) => {
  return async (dispatch) => {
    await axiosClient
      .post("/auth/login", params)
      .then((response) => {
        axiosClient.saveToken(response.data.accessToken);
        document.cookie = `refresh_token=${response.data.refreshToken}`;
        if (response) {
          //response gồm có accessToken và refreshToken
          localStorage.setItem(
            StorageKeys.REFRESH_TOKEN,
            JSON.stringify(response.data.refreshToken)
          );
          dispatch(setLogin(response.data));
        }
      })
      .catch((errors) => {
        console.log(errors);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid username or password!",
        });
      });
  };
};

export const refreshTokenToReset = (params) => {
  return async (dispatch) => {
    await axiosClient
      .post("/auth/accesstoken", params)
      .then((response) => {
        axiosClient.saveToken(response.data.accessToken);
        if (response) {
          dispatch(setLogin(response.data));
        }
      })
      .catch((errors) => {
        console.log(errors);
        if (errors.status === 403) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Refresh token is not in database!",
          });
        }
        if (errors.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Cannot create new access token. Old access token is not expired",
          });
        }
      });
  };
};

export const logoutAccount = (loading = true) => {
  return (dispatch) => {
    localStorage.removeItem(StorageKeys.TOKEN);
    localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
    if (loading) {
      dispatch(setLogout(loading));
    }
  };
};

export const sendOTP = (params) => {
  return async (dispatch) => {
    await axiosClient
      .post("/forgot-password", params)
      .then((response) => {
        if (response) {
          dispatch(setOTP(response.data));
          dispatch(setEmail(params.email));
          dispatch(setErrorMessage(SUCCESS));
        }
      })
      .catch((error) => {
        console.log("Fail to send otp", error.data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email does not exist!",
        });
      });
  };
};

export const verificationOTP = (params) => {
  return async (dispatch) => {
    await axiosClient
      .post("/verification", params)
      .then((response) => {
        if (response) {
          dispatch(setOTP(response.data));
          dispatch(setErrorMessage(SUCCESS));
        }
      })
      .catch((errors) => {
        console.log("Verification OTP fail", errors);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "OTP does not exist!",
        });
      });
  };
};

export const updatePassword = (params) => {
  return async (dispatch) => {
    await axiosClient
      .put("/change-password", params)
      .then((response) => {
        if (response) {
          console.log("response: ", response);
        }
      })
      .catch((errors) => {
        console.log("Update fail", errors);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Update Password Fail!",
        });
      });
  };
};

export const setLogin = (payload) => {
  return {
    type: LOGIN.SET_LOGIN,
    payload,
  };
};

export const setLogout = (payload) => {
  return {
    type: LOGIN.SET_LOGOUT,
    payload,
  };
};

export const setAccount = (payload) => {
  return {
    type: LOGIN.SET_ACOUNT,
    payload,
  };
};

export const setOTP = (payload) => {
  return {
    type: LOGIN.SET_OTP,
    payload,
  };
};

export const setEmail = (payload) => {
  return {
    type: LOGIN.SET_EMAIL,
    payload,
  };
};

export const setErrorMessage = (payload) => {
  return {
    type: LOGIN.SET_ERROR_MESSAGE,
    payload,
  };
};
