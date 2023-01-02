import { PERMISSION } from "./types";

export const setPermission = (payload) => {
  return {
    type: PERMISSION.SET_PERMISSION,
    payload,
  };
};

export const setPermissions = (payload) => {
  return {
    type: PERMISSION.SET_PERMISSIONS,
    payload,
  };
};
