import axiosClient from "~/apis/axiosClient";
import { CALENDAR } from "./types";

export const getClassLocation = (params) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .getByUrl(`/class_location`)
        .then((response) => {
          if (response) {
            dispatch(setClassLocation(response));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const getClassStatus = (params) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .getByUrl(`/class_status`)
        .then((response) => {
          if (response) {
            dispatch(setClassStatus(response));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const getClassFSU = () => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .getByUrl(`/fsu`)
        .then((response) => {
          if (response) {
            dispatch(setClassFsu(response));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const getClassTrainer = () => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .getByUrl(`/training-class/calendar/trainers`)
        .then((response) => {
          if (response) {
            dispatch(setClassTrainers(response.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const getClassListByDate = (params) => {
  console.log(params);
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .getByUrl(`/training-class/calendar/get-date?current_date=${params}`)
        .then((response) => {
          if (response) {
            dispatch(setClassList(response.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const getClassListByFilter = (params) => {
  console.log(params);
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .getByUrl(
          `/training-class/calendar/filter-class?keyword=${params.keyword}&location=${params.location}&status=${params.status}&attendee=${params.attendee}&from=${params.from}&to=${params.to}&classTime=${params.classTime}&fsu=${params.fsu}&trainer=${params.trainer}`
        )
        .then((response) => {
          if (response) {
            console.log(response.data);
            dispatch(setClassList(response.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const getClassCalendarByKeyword = (params) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .getByUrl(`/training-class/calendar/${params}`)
        .then((response) => {
          if (response) {
            dispatch(setClassListByKeyword(response.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const getClassListAll = (params) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .getByUrl(`/training-class/calendar/`)
        .then((response) => {
          if (response) {
            dispatch(setClassList(response.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const setSearchValueKey = (payload) => {
  return {
    type: CALENDAR.SET_SEARCH_VALUE,
    payload,
  };
};

export const setClassList = (payload) => {
  return {
    type: CALENDAR.SET_CLASS_LIST,
    payload,
  };
};

export const setClassListByKeyword = (payload) => {
  return {
    type: CALENDAR.SET_CLASS_LIST_BY_KEYWORD,
    payload,
  };
};

export const setClassLocation = (payload) => {
  return {
    type: CALENDAR.SET_CLASS_LOCATION,
    payload,
  };
};

export const setClassStatus = (payload) => {
  return {
    type: CALENDAR.SET_CLASS_STATUS,
    payload,
  };
};

export const setClassAttendee = (payload) => {
  return {
    type: CALENDAR.SET_CLASS_ATTENDEE,
    payload,
  };
};

export const setClassFsu = (payload) => {
  return {
    type: CALENDAR.SET_CLASS_FSU,
    payload,
  };
};

export const setClassTrainers = (payload) => {
  return {
    type: CALENDAR.SET_CLASS_TRAINER,
    payload,
  };
};

export const setFormatType = (payload) => {
  return {
    type: CALENDAR.SET_CLASS_FORMAT_TYPE,
    payload,
  };
};
