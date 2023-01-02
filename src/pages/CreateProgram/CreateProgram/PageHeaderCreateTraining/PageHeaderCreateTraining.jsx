import React from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { MoreHorizontalIcon } from "~/components/Icons";
import LabelStatus from "~/components/LabelStatus";
import MenuTrainingProgram from "~/components/Poper/MenuTrainingProgram";
import styles from "./PageHeaderCreateTraining.module.scss";

const cx = classNames.bind(styles);

function PageHeaderCreateTraining() {
  const account = useSelector((state) => state.account.account);
  const trainingProgramName = useSelector(
    (state) => state.trainingProgram.newTrainingProgramName
  );
  const listSyllabusChoose = useSelector(
    (state) => state.programSyllabus.listSyllabusChoose
  );
  const programSyllabusToEdit = useSelector(
    (state) => state.programSyllabus.programSyllabusToEdit
  );

  const currentDate = new Date();

  const monthFormat =
    currentDate.getMonth() < 10
      ? `0${currentDate.getMonth() + 1}`
      : currentDate.getMonth() + 1;
  const dayFormat =
    currentDate.getDay() < 10
      ? `0${currentDate.getDay()}`
      : currentDate.getDay();

  const currentDateFormat = `${dayFormat}/${monthFormat}/${currentDate.getFullYear()}`;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("page-header")}>
        <p className={cx("title")}>Training program</p>
        <div className={cx("content")}>
          <div className={cx("box")}>
            <p className={cx("name")}>{trainingProgramName}</p>
            {programSyllabusToEdit.status === "ACTIVE" && (
              <LabelStatus active>Active</LabelStatus>
            )}
            {programSyllabusToEdit.status === "INACTIVE" && (
              <LabelStatus inactive>Inactive</LabelStatus>
            )}
            {programSyllabusToEdit.status === "DELETED" && (
              <LabelStatus deleted>DELETED</LabelStatus>
            )}
          </div>

          <MenuTrainingProgram>
            <div>
              <MoreHorizontalIcon className={cx("more-btn")} />
            </div>
          </MenuTrainingProgram>
        </div>
      </div>
      <div className={cx("meta-data")}>
        <div className={cx("time")}>
          <p className={cx("days")}>
            {listSyllabusChoose?.length > 0 ? (
              <span className={cx("number")}>
                {listSyllabusChoose?.reduce(function (total, syllabus) {
                  return (total += syllabus.days);
                }, 0)}
              </span>
            ) : (
              <span className={cx("number")}>...</span>
            )}
            <span className={cx("day")}> days</span>
          </p>
          <p className={cx("hour")}>
            (
            {listSyllabusChoose?.length > 0 ? (
              <span style={{ paddingRight: "3px" }}>
                {listSyllabusChoose?.reduce(function (total, syllabus) {
                  return (total += syllabus.hours);
                }, 0)}
              </span>
            ) : (
              <span style={{ paddingRight: "3px" }}>...</span>
            )}{" "}
            hours)
          </p>
        </div>
        <p className={cx("modifi")}>
          Modified on <i style={{ paddingRight: "2px" }}>{currentDateFormat}</i>{" "}
          by <strong>{account.fullname}</strong>
        </p>
      </div>
      <div className={cx("line")}></div>
    </div>
  );
}

export default PageHeaderCreateTraining;
