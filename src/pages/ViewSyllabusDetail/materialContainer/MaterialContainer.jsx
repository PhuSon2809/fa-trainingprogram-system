import React, { Fragment, useCallback, useState } from "react";

import "./MaterialContainer.styles.scss";

import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { useDispatch, useSelector } from "react-redux";
import { deleteAMaterial, getAMaterial } from "~/redux/actions/material";

import { dateFormatter } from "~/utils/dateFormatter";
import { detectMimeType, fileEncoder } from "~/utils/fileHandler";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ImportModal from "../ImportModal";

function MaterialContainer({
  index,
  privData,
  setPrivData,
  setModalData,
  syllabusID,
}) {
  const dispatch = useDispatch();

  const downed = useSelector((store) => store.material.data);

  const [filetype, setFileType] = useState(undefined);
  const [material, setMaterial] = useState(privData.lesson.materials[index]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGet, setIsGet] = useState(false);
  const [file, setFile] = useState(null);

  const modalData = {
    title: "Update Training Material",
    materialID: material?.id,
    materialName: material?.name.split(".")[0],
    materialUrl: material?.url,
    materialFileName: material?.name,
    materialData: file,
    materialFileType: filetype,
    materialUpdate: true,
  };

  const handleChange = useCallback(() => {
    getFileType(material.name);
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const onClickDelete = (id) => {
    dispatch(deleteAMaterial(id));
    delete privData.lesson.materials[index];
    setPrivData(privData);
    setMaterial(null);
  };

  const getFileType = async (name) => {
    if (name.indexOf(".") >= 0) {
      const ext = name.split(".");
      if (ext) {
        const type = await detectMimeType("." + ext[1]);
        setFileType(type);
      }
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  function redirect(url) {
    if (url) {
      window.open(url, "_blank");
    }
  }

  const getDataMaterial = async (id) => {
    if (!isGet) {
      dispatch(getAMaterial(material?.id));
      setIsGet(true);
    } else {
      if (material?.data) {
        if (downed.id === material?.id) {
          const b64 = await fileEncoder(downed.response);
          const data = b64.split("base64,")[1];
          setFile(data);
        }
      }
    }
  };

  getDataMaterial();

  return (
    <Fragment>
      {material ? (
        <div className={`material-container`}>
          <a
            onClick={() => {
              getFileType(material.name);
              redirect(material?.url);
            }}

            href={(filetype && file )? `data:${filetype};base64,${file}` : "#"}
            download={(filetype&&file) ? material.name || true : false}
            className="material-file"
            id={`material-file-${material.id}`}
          >
            {material?.name}
          </a>
          <span className="material-author">
            by{" "}
            {material?.updatedByUser?.fullname ||
              material?.createdByUser?.fullname}{" "}
            on {dateFormatter(material?.updatedDate)}
          </span>
          <button className="material-icon">
            <ModeOutlinedIcon
              fontSize="medium"
              onClick={() => handleChange()}
            />
          </button>
          <button onClick={() => handleClickOpen()} className="material-icon">
            <DeleteForeverOutlinedIcon fontSize="medium" />
          </button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do You Want To Delete &nbsp;
                <span className="dialog-delete-title">{material?.name}</span>
                &nbsp; Material?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button value={false} onClick={handleClose}>
                Disagree
              </Button>
              <Button
                value={true}
                onClick={() => onClickDelete(material.id)}
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          <ImportModal
            setMaterial={setMaterial}
            syllabusID={syllabusID}
            lessonID={privData?.lesson?.id}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            privData={privData}
            setPrivData={setPrivData}
            modalData={modalData}
            index={index}
          />{" "}
        </div>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
}

export default MaterialContainer;
