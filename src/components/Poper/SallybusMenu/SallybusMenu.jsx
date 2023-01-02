import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./SyllabusMenu.module.scss";
import HeadlessTippy from "@tippyjs/react/headless";
import Poper from "~/components/Poper";
import {
  addTrainingProgramData,
  editSyllabusData,
  duplicateSyllabusData,
  deleteSyllabusData,
} from "~/assets/data/SyllabusMenuData";
import ButtonComponent from "~/components/Button";
import { Link, useNavigate } from "react-router-dom";
import config from "~/config";
import { useDispatch } from "react-redux";

import { getSyllabusByID } from "~/redux/actions/syllabusDetail";
import {
  deleteSyllabus,
  duplicateSyllabus,
  getIdSyllabusEdit,
} from "~/redux/actions/syllabusList";
import { Modal } from "antd";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const cx = classNames.bind(styles);

function Menu({ children, hideOnClick = false, id, filter, syllabus }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Do you really want to delete this syllabus?"
  );

  const handleAdd = () => {
    return navigate(config.routes.createProgram);
  };

  const handleEdit = () => {
    return dispatch(getIdSyllabusEdit(id));
  };

  const handleDuplicate = () => {
    return dispatch(duplicateSyllabus(id, filter));
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("Do you really want to delete this syllabus?");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  if (confirmLoading) {
    dispatch(deleteSyllabus(id, filter));
  }

  const handleCancel = () => {
    setOpen(false);
  };

  const renderResult = (attrs) => (
    <div className={cx("wrapper")} tabIndex="-1" {...attrs}>
      <Poper className={cx("menu-wrapper")}>
        <div className={cx("action-btn")}>
          <ButtonComponent
            className={cx("button")}
            key={addTrainingProgramData.id}
            leftIcon={addTrainingProgramData.icon}
            onClick={handleAdd}
          >
            {addTrainingProgramData.title}
          </ButtonComponent>
          <ButtonComponent
            className={cx("button")}
            key={editSyllabusData.id}
            leftIcon={editSyllabusData.icon}
            onClick={handleEdit}
          >
            <Link to={config.routes.createSyllabus}>
              {editSyllabusData.title}
            </Link>
          </ButtonComponent>
          <ButtonComponent
            className={cx("button")}
            key={duplicateSyllabusData.id}
            leftIcon={duplicateSyllabusData.icon}
            onClick={handleDuplicate}
          >
            {duplicateSyllabusData.title}
          </ButtonComponent>
          <ButtonComponent
            className={cx("button")}
            key={deleteSyllabusData.id}
            leftIcon={deleteSyllabusData.icon}
            onClick={showModal}
          >
            {deleteSyllabusData.title}
          </ButtonComponent>
        </div>
      </Poper>
      {/* <Modal
        title="Delete Confirm"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal> */}
      <Dialog
            open={open}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {modalText}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button value={false} onClick={handleCancel}>
                Disagree
              </Button>
              <Button
                value={true}
                onClick={handleOk}
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
      ;
    </div>
  );

  return (
    <HeadlessTippy
      interactive
      delay={[0, 150]}
      offset={[10, -3]}
      placement="bottom-end"
      hideOnClick={hideOnClick}
      render={renderResult}
    >
      {children}
    </HeadlessTippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  hideOnClick: PropTypes.bool,
};

export default Menu;
