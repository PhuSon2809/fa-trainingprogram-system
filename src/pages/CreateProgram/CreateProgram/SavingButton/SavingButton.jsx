import React, { memo } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import config from "~/config";
import {
  clearProgramSyllabusToSaveComplete,
  createNewProgramSyllabusComplete,
  createNewProgramSyllabusDraft,
  updateListSyllabusForTP,
  updateProgramSyllabus,
  duplicateProgramSyllabus,
} from "~/redux/actions/programSyllabus";
import { setTrainingProgramName } from "~/redux/actions/trainingProgram";
import styles from "./SavingButton.scss";

const cx = classNames.bind(styles);

function SavingButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.mode.status);
  const newTPName = useSelector(
    (state) => state.trainingProgram.newTrainingProgramName
  );
  const listSyllabusChoose = useSelector(
    (state) => state.programSyllabus.listSyllabusChoose
  );
  const programSyllabusToEdit = useSelector(
    (state) => state.programSyllabus.programSyllabusToEdit
  );
  console.log(listSyllabusChoose);
  console.log(programSyllabusToEdit);

  const handelEditTrainingProgram = () => {
    // console.log(programSyllabusToEdit);
    const listIdSyllabus = listSyllabusChoose.map(function (e) {
      return e.id;
    });
    const trainingProgramToEdit = {
      id: programSyllabusToEdit.id,
      syllabuses: listIdSyllabus,
    };
    console.log(trainingProgramToEdit);
    dispatch(updateProgramSyllabus(trainingProgramToEdit));
    dispatch(updateListSyllabusForTP([]));
    dispatch(setTrainingProgramName(""));
    navigate(`/program/view_list_program`);
  };

  const handleSaveDraft = () => {
    const listIdSyllabus = listSyllabusChoose.map(function (e) {
      return e.id;
    });
    const newTrainingProgram = {
      id: "",
      name: newTPName,
      syllabuses: listIdSyllabus,
    };
    console.log(newTrainingProgram);
    dispatch(createNewProgramSyllabusDraft(newTrainingProgram));
    dispatch(updateListSyllabusForTP([]));
    dispatch(setTrainingProgramName(""));
    navigate(`/program/view_list_program_syllabus_draft`);
  };

  const handleSaveComplete = () => {
    const listIdSyllabus = listSyllabusChoose.map(function (e) {
      return e.id;
    });
    const newTrainingProgram = {
      id: programSyllabusToEdit ? programSyllabusToEdit.id : "",
      name: newTPName,
      syllabuses: listIdSyllabus,
    };
    console.log(newTrainingProgram);
    dispatch(createNewProgramSyllabusComplete(newTrainingProgram));
    dispatch(updateListSyllabusForTP([]));
    dispatch(clearProgramSyllabusToSaveComplete());
    dispatch(setTrainingProgramName(""));
    navigate(`/program/view_list_program`);
  };

  const handleDuplicate = () => {
    const listIdSyllabus = listSyllabusChoose.map(function (e) {
      return e.id;
    });
    const newTrainingProgram = {
      id: "",
      name: newTPName,
      syllabuses: listIdSyllabus,
    };
    console.log(newTrainingProgram);
    dispatch(duplicateProgramSyllabus(newTrainingProgram));
    dispatch(updateListSyllabusForTP([]));
    dispatch(clearProgramSyllabusToSaveComplete());
    dispatch(setTrainingProgramName(""));
    navigate(`/program/view_list_program`);
  };

  return (
    <div className={cx("wrappers")}>
      <div className={cx("back_button")}>
        <button className={cx("text_btn")}>
          <Link to={config.routes.createProgramName}>Back</Link>
        </button>
      </div>
      <div className={cx("save_cancel_button")}>
        <div
          className={cx("cancel_btn")}
          onClick={() => dispatch(updateListSyllabusForTP([]))}
        >
          <button className={cx("text_btn", "text_btn--cancel")}>
            <Link>Cancel</Link>
          </button>
        </div>
        {mode === "" || mode === "create" ? (
          <>
            <div className={cx("save-btn")} onClick={() => handleSaveDraft()}>
              <button className={cx("text_btn")}>Save Draft</button>
            </div>
            <div
              className={cx("save-btn", "complete")}
              onClick={() => handleSaveComplete()}
            >
              <button className={cx("text_btn")}>Save Complete</button>
            </div>
          </>
        ) : null}
        {mode === "update" && (
          <div
            className={cx("update-btn")}
            onClick={() => handelEditTrainingProgram()}
          >
            <button className={cx("text_btn")}>Update</button>
          </div>
        )}
        {mode === "duplicate" && (
          <div className={cx("update-btn")} onClick={() => handleDuplicate()}>
            <button className={cx("text_btn")}>Duplicate</button>
          </div>
        )}
      </div>
    </div>
  );
}
export default memo(SavingButton);
