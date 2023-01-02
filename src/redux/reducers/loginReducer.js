import { LOGIN } from "../actions/types";
import axiosClient from "~/apis/axiosClient";
import StorageKeys from "../constants/storage-keys";

const token = axiosClient.getToken();
let refreshToken = "";
if (token) {
  refreshToken = JSON.parse(localStorage.getItem(StorageKeys.REFRESH_TOKEN));
}

const initState = {
  login: "",
  logout: "",
  token: token,
  refreshToken: refreshToken,
  inforUser: "",
  otpId: "",
  emailOTP: "",
  error: "",
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN.SET_LOGIN:
      return {
        ...state,
        token: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case LOGIN.SET_LOGOUT:
      return {
        ...state,
        token: null,
        refreshToken: null,
      };
    case LOGIN.SET_ACOUNT:
      return {
        ...state,
        inforUser: action.payload,
      };
    case LOGIN.SET_OTP:
      return {
        ...state,
        otpId: action.payload,
      };
    case LOGIN.SET_EMAIL:
      return {
        ...state,
        emailOTP: action.payload,
      };
    case LOGIN.SET_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
