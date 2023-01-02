import axiosClient from "~/apis/axiosClient";
import { SYLLABUS } from "./types";
import Swal from "sweetalert2";

export const getDraft = (params) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .getByUrl(
          `/syllabus/drafts?userId=${params}&page=1&size=10&sortType=DESC`
        )
        .then((response) => {
          if (response) {
            console.log(response);
            dispatch(setDraft(response.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};
export const deleteDraft = (id) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .deleteWithId(`/syllabus/${id}`)
        .then((response) => {
          if (response) {
            console.log(response);
            dispatch(getDraft());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const addDraft = (params) => {
  console.log(params);
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .post("/syllabus/draft", params)
        .then((response) => {
          if (response) {
            console.log(response);
            Swal.fire(
              "Saved as draft!",
              "Your file has been save as draft.",
              "success"
            ).then(() => {
              window.location.reload();
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fail!",
          });
        });
    }
  };
};

export const addSyllabus = (params) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .post("/syllabus/create", params)
        .then((response) => {
          if (response) {
            console.log(response);
            Swal.fire("Saved!", "Your file has been save.", "success").then(
              () => {
                window.location.reload();
              }
            );
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fail!",
          });
        });
    }
  };
};

export const getLevel = () => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .get(`/syllabus_level`)
        .then((response) => {
          if (response) {
            console.log(response);
            dispatch(setLevel(response));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};
export const getDelivery = () => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .get(`/delivery_type`)
        .then((response) => {
          console.log(response);
          dispatch(setDelivery(response));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const getOutputStandard = () => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .get(`/output_standard`)
        .then((response) => {
          console.log(response);
          dispatch(setOutputStandard(response));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const setDraft = (payload) => {
  return {
    type: SYLLABUS.SET_DRAFT,
    payload,
  };
};

export const setLevel = (payload) => {
  return {
    type: SYLLABUS.SET_LEVEL,
    payload,
  };
};

export const setDelivery = (payload) => {
  return {
    type: SYLLABUS.SET_DELIVERY,
    payload,
  };
};

export const setOutputStandard = (payload) => {
  return {
    type: SYLLABUS.SET_OUTPUT_STANDARD,
    payload,
  };
};
