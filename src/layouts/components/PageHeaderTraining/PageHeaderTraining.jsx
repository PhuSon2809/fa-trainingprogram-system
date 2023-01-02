import React from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { MoreHorizontalIcon } from "../../../components/Icons";
import LabelStatus from "../../../components/LabelStatus";
import MenuTrainingProgram from "../../../components/Poper/MenuTrainingProgram";
import styles from "./PageHeaderTraining.module.scss";
import moment from "moment";

const cx = classNames.bind(styles);

function PageHeaderTraining() {
  const trainingProgramDetail = useSelector(
    (state) => state.trainingProgram.trainingProgram
  );

  console.log(trainingProgramDetail);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("page-header")}>
        <p className={cx("title")}>Training program</p>
        <div className={cx("content")}>
          <div className={cx("box")}>
            <p className={cx("name")}>
              {trainingProgramDetail.name}_{trainingProgramDetail.version}
            </p>
            {trainingProgramDetail.status === "ACTIVE" && (
              <LabelStatus active>Active</LabelStatus>
            )}
            {trainingProgramDetail.status === "INACTIVE" && (
              <LabelStatus inactive>Inactive</LabelStatus>
            )}
            {trainingProgramDetail.status === "DELETED" && (
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
            <span className={cx("number")}>
              {trainingProgramDetail.duration}
            </span>
            <span className={cx("day")}> days</span>
          </p>
          <p className={cx("hour")}>({trainingProgramDetail.hours} hours)</p>
        </div>
        <p className={cx("modifi")}>
          Modified on{" "}
          <i>
            {moment(trainingProgramDetail.updatedDate).format("DD/MM/YYYY")}
          </i>{" "}
          by <strong>{trainingProgramDetail.updatedBy}</strong>
        </p>
      </div>
      <div className={cx("line")}></div>
    </div>
  );
}

export default PageHeaderTraining;
