import React, { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from "reactstrap";
import Button from "~/components/Button";
import {
  AddNewIcon,
  CancelIcon,
  DeleteIcon,
  EditIcon,
  UploadIcon,
} from "~/components/Icons";
import {
  createNewMaterial,
  deleteMaterial,
  updateMaterial,
} from "~/redux/actions/material";
import "./PopupMaterial.scss";
import { SwapOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import FormData from "form-data";

const MODE = {
  UPLOAD: "upload",
  UPDATE: "update",
};

function PopupMaterial({
  modalOpen,
  showModal,
  materials,
  chapterName,
  chapterId,
  unitNo,
  dayNo,
}) {
  const dispatch = useDispatch();
  const { programID, syllabusID } = useParams();
  const account = useSelector((state) => state.account.account);
  const role = useSelector((state) => state.account.role);

  console.log("chapterId", chapterId, syllabusID);

  const [mode, setMode] = useState(MODE.UPLOAD);
  const [showAdd, setShowAdd] = useState(false);
  const [urlError, setUrlError] = useState("");
  const [nameError, setNameError] = useState("");
  const [inputValue, setInputValue] = useState({
    url: "",
    name: "",
  });
  const [selectedFile, setSelectedFile] = useState("");
  const [materialUpdate, setMaterialUpdate] = useState();

  const handleSetModeUpdate = (material) => {
    setMode(MODE.UPDATE);
    setMaterialUpdate(material);
    const input = {
      ...inputValue,
      url: material.url,
      name: material.name,
    };
    setInputValue(input);
  };

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const input = {
      ...inputValue,
      [name]: value,
    };
    setInputValue(input);
  };

  const handleValidation = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "url") {
      const urlLength = value.length;
      if (urlLength === 0) {
        setUrlError("Please field url.");
      } else {
        setUrlError("");
      }
    } else {
      const nameLength = value.length;
      if (nameLength === 0) {
        setNameError("Please field name.");
      } else {
        setNameError("");
      }
    }
  };

  const handleDeleteMaterial = (materialId) => {
    console.log(materialId);
    dispatch(deleteMaterial(materialId, programID));
  };

  const handleAddNewMaterial = async () => {
    try {
      const newMaterial = {
        file: selectedFile,
        unitChapterId: chapterId,
        syllabusId: syllabusID,
        url: inputValue.url,
        name: inputValue.name,
      };
      const formData = new FormData();
      for (var key in newMaterial) {
        formData.append(key, newMaterial[key]);
      }
      if (urlError || nameError) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your url or name is emty!",
        });
      } else {
        dispatch(createNewMaterial(formData, chapterId, programID));
        const input = {
          ...inputValue,
          url: "",
          name: "",
        };
        setInputValue(input);
        setSelectedFile("");
        setShowAdd(!showAdd);
      }
    } catch (error) {
      console.log("failed to create material: ", error);
    }
  };

  const handleUpdateMaterial = async () => {
    const newMaterial = {
      file: selectedFile,
      materialId: materialUpdate.id,
      syllabusId: syllabusID,
      url: inputValue.url,
      name: inputValue.name,
    };
    const formData = new FormData();
    for (var key in newMaterial) {
      formData.append(key, newMaterial[key]);
    }
    if (urlError || nameError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your url or name is emty!",
      });
    } else {
      dispatch(updateMaterial(formData, materialUpdate.id, programID));
      const input = {
        ...inputValue,
        url: "",
        name: "",
      };
      setInputValue(input);
      setSelectedFile("");
      setShowAdd(!showAdd);
    }
  };

  return (
    <Modal
      contentClassName="materials shadow"
      centered
      backdrop="static"
      isOpen={modalOpen}
      toggle={showModal}
    >
      <div className="modal-title">
        <div className="name">
          <p>Day {dayNo}</p>
        </div>
        <Button
          leftIcon={<CancelIcon />}
          onClick={() => showModal(chapterName)}
        />
      </div>
      <div className="content">
        <div className="title">
          <p>Unit {unitNo}</p>
          <p>{chapterName}</p>
        </div>

        <div className="list-material">
          <p>{chapterName}</p>

          {materials.length === 0 && (
            <div className="line-noti">
              <p className="notification">No have material in here</p>
            </div>
          )}
          {materials.map((material) => (
            <div key={material.id} className="material">
              <a
                style={{ width: "270px" }}
                href={material.url}
                download={material.url}
              >
                <p>{material.name}</p>
              </a>
              <div className="infor">
                <p>
                  by {material.updatedBy} on{" "}
                  {moment(material.updatedDate).format("DD/MM/YYYY")}
                </p>
                {(account && role === "Super Admin") ||
                (account && role === "Trainer") ? (
                  <div className="group-btn">
                    <Button
                      leftIcon={<EditIcon />}
                      onClick={() => handleSetModeUpdate(material)}
                    />
                    <Button
                      leftIcon={<DeleteIcon />}
                      onClick={() => handleDeleteMaterial(material.id)}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {(account && role === "Super Admin") ||
        (account && role === "Class Admin") ? (
          <>
            {mode === MODE.UPLOAD && (
              <div className="add-material">
                <div
                  className="add-action"
                  onClick={() => setShowAdd(!showAdd)}
                >
                  <AddNewIcon />
                  <p>Upload new material</p>
                </div>
                {showAdd ? (
                  <>
                    <div className="input-group">
                      <div className="input">
                        <div className="box-select">
                          <input
                            name="name"
                            value={inputValue.name}
                            onChange={handleOnChange}
                            onBlur={handleValidation}
                            className="input-box"
                            placeholder="Type name"
                          />
                        </div>
                        {nameError && <p className="text-error">{nameError}</p>}
                      </div>
                      <div className="input">
                        <div className="box-select">
                          <input
                            name="url"
                            type="url"
                            value={inputValue.url}
                            onChange={handleOnChange}
                            onBlur={handleValidation}
                            className="input-box"
                            placeholder="Type url"
                          />
                        </div>
                        {urlError && <p className="text-error">{urlError}</p>}
                      </div>
                    </div>

                    <div className="upload-group">
                      <span>Select file:</span>
                      <Button type="button" primary className="upload-btn">
                        <p>
                          <UploadIcon /> Upload File
                        </p>
                        <input
                          style={{ display: "block" }}
                          type="file"
                          name="file"
                          onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                      </Button>
                    </div>
                    <div className="file-name">
                      <span>Filename:</span>
                      <p>{selectedFile.name}</p>
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </>
        ) : null}

        {mode === MODE.UPDATE && (
          <div className="add-material">
            <div className="add-action" onClick={() => setShowAdd(!showAdd)}>
              <EditIcon />
              <p>Update material</p>
              {account && role === "Super Admin" && (
                <SwapOutlined onClick={() => setMode(MODE.UPLOAD)} />
              )}
            </div>
            <>
              <p className="update-name">
                Update:{" "}
                {materialUpdate.name && <span>{materialUpdate.name}</span>}
              </p>
              <div className="input-group">
                <div className="input">
                  <div className="box-select">
                    <input
                      name="name"
                      value={inputValue.name}
                      onChange={handleOnChange}
                      onBlur={handleValidation}
                      className="input-box"
                      placeholder="Type name"
                    />
                  </div>
                  {nameError && <p className="text-error">{nameError}</p>}
                </div>
                <div className="input">
                  <div className="box-select">
                    <input
                      name="url"
                      type="url"
                      value={inputValue.url}
                      onChange={handleOnChange}
                      onBlur={handleValidation}
                      className="input-box"
                      placeholder="Type url"
                    />
                  </div>
                  {urlError && <p className="text-error">{urlError}</p>}
                </div>
              </div>

              <div className="upload-group">
                <span>Select file:</span>
                <Button type="button" primary className="upload-btn">
                  <p>
                    <UploadIcon /> Upload File
                  </p>
                  <input
                    style={{ display: "block" }}
                    type="file"
                    name="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </Button>
              </div>
              <div className="file-name">
                <span>Filename:</span>
                <p>{selectedFile.name}</p>
              </div>
            </>
          </div>
        )}
      </div>
      {mode === MODE.UPLOAD && (
        <Button className="action-btn" primary onClick={handleAddNewMaterial}>
          Upload new
        </Button>
      )}

      {(account && role === "Super Admin") ||
      (account && role === "Trainer") ? (
        <>
          {mode === MODE.UPDATE && (
            <Button
              className="action-btn"
              primary
              onClick={handleUpdateMaterial}
            >
              Update
            </Button>
          )}
        </>
      ) : null}
    </Modal>
  );
}

export default PopupMaterial;
