import axiosClient from "~/apis/axiosClient";
const ImportModalAPI = {

  // save_program: (data) => {
  //   const url = `/program_syllabus/complete-program`;
  //   return axiosClient.post(url, data);
  // },
  get_file: async () => {
    // const url = `/program_syllabus/file/download`;
    const url = `/syllabus/template/download`;
    return await axiosClient.get(url, {
      headers: { Accept: "application/vnd.ms-excel" },
      responseType: "blob",
    });
  },
  post_file: (file) => {
    const url = `/syllabus/import`;
    return axiosClient.post(url, file, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
//
export default ImportModalAPI;
