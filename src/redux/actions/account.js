import axiosClient from "~/apis/axiosClient";
import { ACCOUNT } from "./types";

const accountApi = {
  async getAccount() {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      return axiosClient.post("/auth/validation");
    }
  },
}

export default accountApi;

export const getAccount = () => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .post("/auth/validation")
        .then((response) => {
          dispatch(setAccount(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const setAccount = (payload) => {
  return {
    type: ACCOUNT.SET_ACCOUNT,
    payload,
  };
};

export const setAccounts = (payload) => {
  return {
    type: ACCOUNT.SET_ACCOUNTS,
    payload,
  };
};

export const setErrorStatus = (payload) => {
  return {
    type: ACCOUNT.SET_ERROR_STATUS,
    payload,
  };
};
