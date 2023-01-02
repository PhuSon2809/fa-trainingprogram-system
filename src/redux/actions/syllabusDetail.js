import axiosClient from "~/apis/axiosClient";
import { SYLLABUS_DETAIL } from "./types";
import Swal from "sweetalert2";
import { getListSyllabus } from "./syllabusList";

const syllabusApi = {
  async getSyllabusDetail(id) {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      const response = await axiosClient.get(`/syllabus/${id}`);
      return response.data;
    }
  },
};

export default syllabusApi;

export const getSyllabusByID = (id) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .get("/syllabus", id)
        .then((response) => {
          if (response) {
            dispatch(setSyllabusByID(response));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const ChangeStatusSyllabus = (id, syllabusDetail) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .put(`/syllabus/de-active/${id}`)
        .then((response) => {
          if (response) {
            const res= syllabusDetail.detail
            res.data.status=response.data.status
            dispatch(setSyllabusByID(res));
            console.log("success update");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

export const deleteSyllabusById = (id, syllabusDetail) => {
  return (dispatch) => {
    const token = axiosClient.getToken();
    if (token) {
      axiosClient.setHeaderAuth(token);
      axiosClient
        .deleteWithId("/syllabus", id)
        .then((response) => {
          if (response) {
            const res= syllabusDetail.detail
            res.data.status="DELETED"
            dispatch(deleteSyllabusResponse(response));
            dispatch(setSyllabusByID(res));
            dispatch(getListSyllabus({page:1, size:10}));
            Swal.fire({
              icon: "success",
              title: "Delete training program successfully.",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};



export const setSyllabusByID = (payload) => {
  return {
    type: SYLLABUS_DETAIL.GET_SYLLABUS_DETAIL_BY_ID,
    payload,
  };
};

export const deleteSyllabusResponse = (payload) => {
  return {
    type: SYLLABUS_DETAIL.DELETE_SYLLABUS_DETAIL_BY_ID,
    payload,
  };
};

