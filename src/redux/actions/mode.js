import { MODE } from "./types";

export const setModeUpdate = (payload) => {
  return {
    type: MODE.SET_UPDATE,
    payload,
  };
};

export const setModeCreate = (payload) => {
  return {
    type: MODE.SET_CREATE,
    payload,
  };
};

export const clearStatusMode = (payload) => {
  return {
    type: MODE.SET_CLEAR_STATUS,
    payload,
  };
};

export const setModeDuplicate = (payload) => {
  return {
    type: MODE.SET_DUPLICATE,
    payload,
  };
};
