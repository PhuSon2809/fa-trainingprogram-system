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
  FolderIcon,
  VisibilityOffIcon,
} from "~/components/Icons";
import Poper from "~/components/Poper";
import styles from "~/components/Poper/Menu/Menu.module.scss";
import PoperHeader from "~/components/Poper/PoperHeader/PoperHeader";
import { setModeUpdate,setModeDuplicate } from "~/redux/actions/mode";
import { setProgramToEditInList } from "~/redux/actions/programSyllabus";
import {
  deleteTrainingProgram,
  getTrainingProgramDetail,
  updateStatusTrainingProgramInList,
  duplicateTrainingProgram,
} from "~/redux/actions/trainingProgram";

const cx = classNames.bind(styles);

function MenuPopup({ children, hideOnClick = false, program, size }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const trainingProgramDetail = useSelector(
    (state) => state.trainingProgram.trainingProgram
  );

  const handelEditTrainingProgram = () => {
    dispatch(setModeUpdate());
    dispatch(getTrainingProgramDetail(program.programId));

    navigate(`/program/create_program`);
  };

  const handelDuplicateTrainingProgram = () => {
    dispatch(setModeDuplicate());
    dispatch(duplicateTrainingProgram(program.programId));
   
    navigate(`/program/create_program`);
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
        if (program.status === "Active") {
          statusUpdate = "INACTIVE";
        } else if (program.status === "Inactive") {
          statusUpdate = "ACTIVE";
        }
        const objUpdateStatus = {
          trainingProgramId: program.programId,
          status: statusUpdate,
        };
        dispatch(updateStatusTrainingProgramInList(objUpdateStatus, size));
      }
    } catch (error) {
      console.log("failed to update status: ", error);
    }
  };

  const handleDelete = () => {
    dispatch(deleteTrainingProgram(program.programId));
  };

  const handleOnclick = () => {
    console.log("est");
  };

  const renderResult = (attrs) => (
    <div className={cx("wrapper")} tabIndex="-1" {...attrs}>
      <Poper className={cx("menu-wrapper")}>
        <PoperHeader>Manager</PoperHeader>
        <div className={cx("action-btn")}>
          <Button
            className={cx("button")}
            leftIcon={<FolderIcon />}
            onClick={handleOnclick}
          >
            Training material
          </Button>
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
            className={cx("button")}
            leftIcon={<DeleteIcon />}
            onClick={() => handleDelete()}
            style={{ color: "#b9b9b9" }}
          >
            Delete program
          </Button>
        </div>
      </Poper>
    </div>
  );

  return (
    <HeadlessTippy
      interactive
      delay={[0, 100]}
      offset={[10, -3]}
      placement="bottom-end"
      hideOnClick={hideOnClick}
      render={renderResult}
    >
      {children}
    </HeadlessTippy>
  );
}

MenuPopup.propTypes = {
  children: PropTypes.node.isRequired,
  hideOnClick: PropTypes.bool,
};

export default MenuPopup;
