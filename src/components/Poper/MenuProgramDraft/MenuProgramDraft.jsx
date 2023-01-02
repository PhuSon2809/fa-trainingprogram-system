import React from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Button from "~/components/Button";
import { CopyIcon, DeleteIcon } from "~/components/Icons";
import Poper from "~/components/Poper";
import {
  deleteProgramSyllabusDraft,
  getProgramSyllabusDetailDraft,
} from "~/redux/actions/programSyllabus";
import PoperHeader from "../PoperHeader";
import styles from "./MenuProgramDraft.module.scss";
import { useNavigate } from "react-router-dom";
import { setTrainingProgramName } from "~/redux/actions/trainingProgram";

const cx = classNames.bind(styles);

function MenuProgramDraft({ children, programDraftId, programDraft }) {
  const account = useSelector((state) => state.account.account);
  const role = useSelector((state) => state.account.role);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteProgramDraft = () => {
    dispatch(deleteProgramSyllabusDraft(programDraftId));
  };

  const handleSaveComplete = () => {
    dispatch(getProgramSyllabusDetailDraft(programDraftId));
    dispatch(setTrainingProgramName(programDraft.name));
    navigate(`/program/create_program`);
  };

  const renderResult = (attrs) => (
    <div className={cx("wrapper")} tabIndex="-1" {...attrs}>
      <Poper className={cx("menu-wrapper")}>
        <PoperHeader>Manager</PoperHeader>
        <div className={cx("action-btn")}>
          <Button
            className={cx("button")}
            leftIcon={<CopyIcon />}
            onClick={() => handleSaveComplete()}
          >
            Save complete program
          </Button>
          {(account && role === "Super Admin") ||
          (account && role === "Trainer") ? (
            <Button
              className={cx("button", "gray")}
              leftIcon={<DeleteIcon />}
              onClick={() => handleDeleteProgramDraft()}
            >
              Delete program
            </Button>
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

MenuProgramDraft.propTypes = {
  children: PropTypes.node.isRequired,
  hideOnClick: PropTypes.bool,
};

export default MenuProgramDraft;
