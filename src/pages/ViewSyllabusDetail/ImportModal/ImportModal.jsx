import { useEffect, useState } from "react";
import "./ImportModal.scss";
import { Modal, Divider } from "antd";
import { Input, Form } from "antd/lib";
import { Button } from "@mui/material";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";

import { useSelector, useDispatch } from "react-redux";
import { uploadAMaterial, updateAMaterial } from "~/redux/actions/material";

import { dataURLtoFile } from "~/utils/fileHandler";

function ImportModal(props) {
  const {
    syllabusID,
    lessonID,
    privData,
    setPrivData,
    setIsModalOpen,
    modalData,
    setMaterial,
    index,
  } = props;

  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.material);

  const [fileName, setFileName] = useState(
    modalData?.materialName || "file_name"
  );
  const [fileUrl, setFileUrl] = useState(modalData?.materialUrl || "");
  const [file, setFile] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [tempData, setTempData] = useState(data);

  if (!file && modalData?.materialData) {
    const decodedfile = dataURLtoFile(
      `data:${modalData.materialFileType};base64,${modalData.materialData}`,
      modalData.materialFileName
    );
    setFile(decodedfile);
  }

  useEffect(() => {
    if (data.status === "OK" && (isUpload || isUpdate) && tempData !== data) {
      const materialList = data.data?.syllabus.syllabusDays
        .find((day) => day.dayNo === privData.dayNo)
        .syllabusUnits.find((unit) => unit.id === privData.unit.id)
        .syllabusUnitChapters.find(
          (chapter) => chapter.id === privData.lesson.id
        ).materials;
      const uploadFile = materialList[materialList?.length - 1];
      if (isUpload) {
        const newData = privData.lesson.materials.push(uploadFile);
        setPrivData(newData);
        setIsUpload(false);
      } else if (isUpdate) {
        delete privData.lesson.materials[index];
        const newData = privData.lesson.materials.push(uploadFile);
        setPrivData(newData);
        setIsUpdate(false);
      }
      setTempData(data);
    }
  }, [isUpload, data, privData]);

  const renderNameFile = () => {
    return <Input type="Text" onChange={handleNameFileChange}></Input>;
  };

  const renderUrlFile = () => {
    return <Input type="Text" onChange={handleUrlChange}></Input>;
  };

  const renderUploadFile = () => {
    return (
      <div>
        <Button variant="outlined" component="label">
          Upload
          <input hidden type="file" onInput={handleUploadFile} />
        </Button>
        {file?.name ? (
          <div className="file-container">
            <AttachmentOutlinedIcon className="file-icon" />
            <span className="preview-file">{file.name}</span>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const handleUploadFile = async (event) => {
    setFile(event.target.files[0]);
  };

  const handleNameFileChange = (event) => {
    setFileName(event.target.value);
  };

  const handleUrlChange = (event) => {
    setFileUrl(event.target.value);
  };

  const handleSubmitForm = async () => {
    const params = {};
    params.syllabusId = syllabusID;
    params.url = fileUrl;
    params.name = fileName;
    params.file = file;
    params.unitChapterId = lessonID;
    dispatch(uploadAMaterial(params));
    setIsUpload(true);
    setIsModalOpen(false);
  };

  const handleUpdateForm = async () => {
    const params = {};
    params.syllabusId = syllabusID;
    params.url = fileUrl;
    params.name = fileName;
    params.file = file;
    params.materialId = modalData?.materialID;
    dispatch(updateAMaterial(params));
    setIsUpdate(true);
    setIsModalOpen(false);
  };

  const handleShutDown = () => {
    props.setIsModalOpen(false);
  };

  const resetForm = () => {
    if (modalData) {
      document.getElementById(`material-form-${modalData.materialID}`).reset();
      console.log("reset!");
    } else {
      document.getElementById("material-form").reset();
    }

    setFile(null);
    setFileName(modalData?.materialName || "file_name");
    setFileUrl(modalData?.materialUrl || "");
  };

  return (
    <div style={{ position: "relative" }}>
      <Modal
        title={modalData?.title || "Import Training Material"}
        open={props.isModalOpen}
        closable
        onCancel={handleShutDown}
        footer={[]}
        width={500}
      >
        <div className="row modal-import-content">
          <div className="col-12">
            <p className="fw-bolder">Material Setting</p>
          </div>
          <Form
            id={
              modalData
                ? `material-form-${modalData.materialID}`
                : "material-form"
            }
            preserve="false"
            name="basic"
            autoComplete="off"
            wrapperCol={{ span: 12 }}
            labelCol={{ span: 4 }}
          >
            <Form.Item
              label="File Name"
              name={"fileName"}
              initialValue={modalData?.materialName || "download"}
              preserve="false"
            >
              {renderNameFile()}
            </Form.Item>
            <Form.Item
              label="File URL"
              name={"fileUrl"}
              initialValue={modalData?.materialUrl || ""}
              preserve="false"
            >
              {renderUrlFile()}
            </Form.Item>
            <Form.Item
              initialValue={file || ""}
              label="File"
              name={"file"}
              preserve="false"
            >
              {renderUploadFile()}
            </Form.Item>

            <Divider />
            <Form.Item>
              {modalData?.materialUpdate ? (
                <Button
                  variant="contained"
                  onClick={() => handleUpdateForm()}
                  key="submit"
                  className={"form-submit-button"}
                >
                  Update
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => handleSubmitForm()}
                  key="submit"
                  className={"form-submit-button"}
                >
                  Submit
                </Button>
              )}
              <Button
                color="warning"
                variant="contained"
                onClick={() => resetForm()}
              >
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default ImportModal;
