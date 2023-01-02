import React from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "~/components/Button";
import {
  CopyIcon,
  DeleteIcon,
  EditIcon,
  VisibilityOffIcon,
} from "~/components/Icons";
import Poper from "~/components/Poper";
import { setModeDuplicate, setModeUpdate } from "~/redux/actions/mode";
import { setProgramSyllabusToEdit } from "~/redux/actions/programSyllabus";
import {
  deleteTrainingProgram,
  duplicateTrainingProgram,
  setTrainingProgramName,
  updateStatusTrainingProgram,
} from "~/redux/actions/trainingProgram";
import PoperHeader from "../PoperHeader";
import styles from "./MenuTrainingProgram.module.scss";

const cx = classNames.bind(styles);

function MenuTrainingProgram({ children }) {
  const account = useSelector((state) => state.account.account);
  const role = useSelector((state) => state.account.role);
  const trainingProgramDetail = useSelector(
    (state) => state.trainingProgram.trainingProgram
  );
  // console.log(trainingProgramDetail);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelEditTrainingProgram = () => {
    dispatch(setModeUpdate());
    dispatch(setProgramSyllabusToEdit(trainingProgramDetail));
    dispatch(setTrainingProgramName(trainingProgramDetail.name));
    navigate(`/program/create_program`);
  };

  const handleOnclick = () => {
    console.log("function onclieck");
  };

  const handleUpdateStatus = async () => {
    try {
      if (trainingProgramDetail.status === "DELETED") {
        Swal.fire(
          "Can not update?",
          "Status training program is DELETED?",
          "question"
        );
      } else {
        let statusUpdate;
        if (trainingProgramDetail.status === "ACTIVE") {
          statusUpdate = "INACTIVE";
        } else if (trainingProgramDetail.status === "INACTIVE") {
          statusUpdate = "ACTIVE";
        }
        const objUpdateStatus = {
          trainingProgramId: trainingProgramDetail.id,
          status: statusUpdate,
        };
        // console.log(objUpdateStatus);
        dispatch(
          updateStatusTrainingProgram(trainingProgramDetail.id, objUpdateStatus)
        );
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
    if (trainingProgramDetail.status === "DELETED") {
      Swal.fire(
        "Can not delete?",
        "Status training program is DELETED?",
        "question"
      );
    } else {
      dispatch(deleteTrainingProgram(trainingProgramDetail.id));
    }
  };

  const handelDuplicateTrainingProgram = () => {
    dispatch(setModeDuplicate());
    dispatch(duplicateTrainingProgram(trainingProgramDetail.id));

    navigate(`/program/create_program`);
  };

  const renderResult = (attrs) => (
    <div className={cx("wrapper")} tabIndex="-1" {...attrs}>
      <Poper className={cx("menu-wrapper")}>
        <PoperHeader>Manager</PoperHeader>
        <div className={cx("action-btn")}>
          {(account && role === "Super Admin") ||
          (account && role === "Trainer") ? (
            <>
              <Button
                className={cx("button")}
                leftIcon={<EditIcon />}
                onClick={() => handelEditTrainingProgram()}
              >
                Edit program
              </Button>
              <Button
                className={cx("button")}
                leftIcon={<CopyIcon />}
                onClick={() => handelDuplicateTrainingProgram()}
              >
                Duplicate program
              </Button>
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
    <div>
      <HeadlessTippy
        interactive
        delay={[0, 500]}
        offset={[10, -3]}
        placement="bottom-end"
        render={renderResult}
      >
        {children}
      </HeadlessTippy>
    </div>
  );
}

MenuTrainingProgram.propTypes = {
  children: PropTypes.node.isRequired,
  hideOnClick: PropTypes.bool,
};

export default MenuTrainingProgram;
