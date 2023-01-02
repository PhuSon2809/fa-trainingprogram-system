import axios from "axios";
import FormData from "form-data";
import { useState } from "react";
import axiosClient from "~/apis/axiosClient";
import Button from "~/components/Button";
import { PenIconImport } from "~/components/Icons";
import Swal from "sweetalert2";

import "./createClass.scss";
import { useNavigate } from "react-router-dom";
const token = axiosClient.getToken();
function CreateClass() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    let headers = {
      accept: "*/*",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    formData.append("file", file);
    const response = axios
      .post("/training_class/import", formData, {
        headers: headers,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "import success",
          timer: 1500,
        });
        navigate("/class/view_class");
      })
      .catch((err) => {
        if (err.data.error !== "") {
          Swal.fire({
            icon: "error",
            timer: 1500,
            title: !err.data.message && "File can not be empty",
          });
        }
      });
  };
  return (
    <div>
      <h4 className="header">Import the CSV/XLSS File to create</h4>
      <form action="" className="form-create-class">
        <div className="import-form">
          <input
          style={{display: 'block'}}
            type="file"
            name="file"
            id="file"
            className="custom-file-input"
            onChange={(e) => handleFile(e)}
          />
        </div>
        <Button
          className={"btn-import"}
          leftIcon={<PenIconImport />}
          onClick={(e) => handleUpload(e)}
        >
          Upload
        </Button>
        {/* <Button className={"btn-create"} leftIcon={<CreateIcon />}>
          Create Class
        </Button> */}
      </form>
    </div>
  );
}

export default CreateClass;
