import axiosClient from "~/apis/axiosClient";
import { SYLLABUS } from "./types";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";

import { addSyllabus } from "./createSyllabus";

export const getListSyllabus = (filter) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient

        .get2(`/syllabus?page=${filter.page}&size=${filter.size}`)

        .then((response) => {
          if (response) {
            dispatch(setListSyllabus(response));
            dispatch(setLoading(false));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const getListSyllabusSearch = (filter, keyword) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .getByUrl(
          `/syllabus?keywords=${encodeURIComponent(keyword)}&page=${
            filter.page
          }&size=${filter.size}`
        )
        .then((response) => {
          if (response) {
            dispatch(getListSyllabusBySearch(response));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const getListSyllabusDate = (filter, start, end) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .get2(
          `/syllabus?startDate=${start}&endDate=${end}&page=${filter.page}&size=${filter.size}`
        )
        .then((response) => {
          if (response) {
            dispatch(getListSyllabusByDate(response));
            dispatch(setLoading(false));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const duplicateSyllabus = (id, filter) => {
  console.log(filter);
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .postWithId("/syllabus/duplicate", `${id}`)
        .then((response) => {
          if (response) {
            const temp= response.data
            temp.name= temp.name + "_" + Math.floor(Math.random() *9999);
            delete temp.assessmentScheme.id
            delete temp.deliveryPrinciple.id
            console.log(temp)
            console.log(JSON.stringify(temp).length)
            
            dispatch(addSyllabus(temp))
            dispatch(getListSyllabus(filter));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const deleteSyllabus = (id, filter) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .deleteWithId("/syllabus", `${id}`)
        .then((response) => {
          if (response) {
            if (response.status === "OK") {
              toast(`Syllabus deleted successfully`);
            } else {
              toast(`Syllabus delete fail`);
            }
            dispatch(getListSyllabus(filter));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const sortSyllabus = (options, filter) => {
  console.log(options);
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .get2(
          `/syllabus?page=${filter.page}&size=${filter.size}&sortBy=${options.field}&sortType=${options.type}`
        )
        .then((response) => {
          if (response) {
            dispatch(setListSyllabus(response));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const postSyllabusModal = (file) => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .postFile(`/syllabus/import`, file)
        .then((response) => {
          if (response) {

            console.log("Import file")
            Swal.fire({
              icon: "success",
              title: "Import Syllabus Successfully",
            })
          } 
        })
        .catch((error) => {
          console.log("error",error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Import Syllabus Fail!",
          });
        });
    }
  };
};

export const getFileDownload = () => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axios.get(`/syllabus/template/download`,{
        headers: { Accept: "application/vnd.ms-excel" },
        responseType: "blob",})
        .then((response) => {
          if (response) {
            console.log(response)
            const url = window.URL.createObjectURL(response);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
      // the filename you want
            a.download = "SyllabusTemplate.zip";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const updateSyllabus = (params) => {
  return async (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      await axiosClient
        .put(`/syllabus/update`, params)
        .then((response) => {
          if (response) {
            console.log("thanh cong roi ne");
            Swal.fire({
              icon: "success",
              title: "Update syllabus  successfully.",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Update syllabus  fail!",
          });
        });
    }
  };
};

export const getListSyllabusSuggest = (keyword) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .get2(`/syllabus/suggest?keyword=${keyword}`)
        .then((response) => {
          if (response) {
            dispatch(getSyllabusListSuggest(response));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const setListSyllabus = (payload) => {
  return {
    type: SYLLABUS.SET_LIST_SYLLABUS,
    payload,
  };
};

export const getListSyllabusBySearch = (payload) => {
  return {
    type: SYLLABUS.GET_LIST_SYLLABUS_BY_SEARCH,
    payload,
  };
};

export const getListSyllabusByDate = (payload) => {
  return {
    type: SYLLABUS.GET_LIST_SYLLABUS_BY_DATE,
    payload,
  };
};

export const deleteSyllabusResponse = (payload) => {
  return {
    type: SYLLABUS.DELETE_SYLLABUS,
    payload,
  };
};

export const getSyllabusItem = (payload) => {
  return {
    type: SYLLABUS.GET_SYLLABUS_ITEM,

    payload,
  };
};

export const getIdSyllabusEdit = (payload) => {
  return {
    type: SYLLABUS.GET_ID_SYLLABUS_EDIT,
    payload,
  };
};

export const getSyllabusListSuggest = (payload) => {
  return {
    type: SYLLABUS.GET_LIST_SUGGEST_SYLLABUS,
    payload,
  };
};

export const setSearchValueSyllabus = (payload) => {
  return {
    type: SYLLABUS.GET_SEARCH_VALUE,
    payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: SYLLABUS.SET_LOADING,
    payload,
  };
};
