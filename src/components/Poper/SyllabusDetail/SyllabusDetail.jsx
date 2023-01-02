import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./SyllabusDetail.module.scss";
import HeadlessTippy from "@tippyjs/react/headless";
import Poper from "~/components/Poper";

import PoperHeader from "../PoperHeader";
import { PoperMenuData } from "~/assets/data/PoperSyllabusDetail";
import Button from "~/components/Button";

import { useDispatch, useSelector } from "react-redux";
import { ChangeStatusSyllabus, deleteSyllabusById } from "~/redux/actions/syllabusDetail";
import { duplicateSyllabus } from "~/redux/actions/syllabusList";

import Swal from "sweetalert2";
import {
  CopyIcon,
  DeleteIcon,
  EditIcon,
  VisibilityOffIcon
} from "~/components/Icons";

const cx = classNames.bind(styles);
function SyllabusDetail({ children, hideOnClick = false }) {
  const handleOnclick = () => {
    console.log("est");
  };

  const dispatch = useDispatch();

  const account = useSelector((state) => state.account.account);
  const role = useSelector((state) => state.account.role);

  const syllabusDetail= useSelector((store) => store.syllabusDetail)
  const syllabusData = syllabusDetail.detail.data

  const handleDuplicate = () => {
    return dispatch(duplicateSyllabus(syllabusData.id, {page:1, size:10}));
  };

  const handleUpdateStatus = async () => {
    try {
      if (syllabusData.status === "DELETED") {
        Swal.fire(
          "Can not update?",
          "Status training program is DELETED?",
          "question"
        );
      } else {
        dispatch(ChangeStatusSyllabus(syllabusData.id, syllabusDetail));
        await Swal.fire({
          icon: "success",
          title: "Update status training program successfully.",
        });
      }
    } catch (error) {
      console.log("failed to update status: ", error);
      await Swal.fire({
        icon: "success",
        title: "Oops...",
        text: "Update status training program fail!",
      });
    }
  };

  const handleDeleteTrainingProgram = () => {
    if (syllabusData.status === "DELETED") {
      Swal.fire(
        "Can not delete?",
        "Status training program is already DELETED?",
        "question"
      );
    } else {
      dispatch(deleteSyllabusById(syllabusData.id, syllabusDetail));
    }
  };

  const renderResult = (attrs) => (
    <div className={cx("wrapper")} tabIndex="-1" {...attrs}>
      <Poper className={cx("menu-wrapper")}>
        <PoperHeader>Manager</PoperHeader>
        <div className={cx("action-btn")}>
          {(account && role === "Super Admin") ||
          (account && role === "Trainer") ? (
            <Button
              className={cx("button")}
              leftIcon={<EditIcon />}
              // onClick={() => handelEditTrainingProgram()}
            >
              Edit program
            </Button>
          ) : null}
          <Button
            className={cx("button")}
            leftIcon={<CopyIcon />}
            onClick={handleDuplicate}
          >
            Duplicate program
          </Button>
          {(account && role === "Super Admin") ||
          (account && role === "Trainer") ? (
            <>
              <Button
                className={cx("button")}
                leftIcon={<VisibilityOffIcon />}
                onClick={() => handleUpdateStatus()}
              >
                De-activate program
              </Button>
              <Button
                className={cx("button", "gray")}
                leftIcon={<DeleteIcon />}
                onClick={() => handleDeleteTrainingProgram()}
              >
                Delete program
              </Button>
            </>
          ) : null}
        </div>
      </Poper>
    </div>
  );

  return (
    <HeadlessTippy
      interactive
      delay={[0, 800]}
      offset={[10, -3]}
      placement="bottom-end"
      hideOnClick={hideOnClick}
      render={renderResult}
    >
      {children}
    </HeadlessTippy>
  );
}

SyllabusDetail.propTypes = {
  children: PropTypes.node.isRequired,
  hideOnClick: PropTypes.bool,
};

export default SyllabusDetail;
