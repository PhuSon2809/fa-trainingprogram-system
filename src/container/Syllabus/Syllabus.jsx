import React from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LabelStatus from "~/components/LabelStatus";
import styles from "./Syllabus.module.scss";
import moment from "moment";

const cx = classNames.bind(styles);

function Syllabus() {
  const { programID } = useParams();
  const trainingProgramDetail = useSelector(
    (state) => state.trainingProgram.trainingProgram
  );
  const navigate = useNavigate();

  const handleNavigator = (syllabusId) => {
    navigate(`/program/view_program_detail/${programID}/${syllabusId}`);
  };

  return (
    <>
      {trainingProgramDetail.syllabusOfProgramDTOList?.map((syllabus) => (
        <div
          key={syllabus.id}
          onClick={() => handleNavigator(syllabus.id)}
          className={cx("syllabus")}
        >
          <div className={cx("program-name")}>
            <p>{syllabus.name}</p>
            {syllabus.status === "ACTIVE" && (
              <LabelStatus active>Active</LabelStatus>
            )}
            {syllabus.status === "INACTIVE" && (
              <LabelStatus inactive>Inactive</LabelStatus>
            )}
          </div>
          <div className={cx("syllabus-meta")}>
            <span>
              {syllabus.code} {syllabus.version}
            </span>
            <span>|</span>
            <span>
              {syllabus.session} days ({syllabus.hours} hours)
            </span>
            <span>|</span>
            <span>
              Modified on{" "}
              <i>{moment(syllabus.updatedDate).format("DD/MM/YYYY")}</i> by{" "}
              {syllabus.updatedByUser}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

export default Syllabus;
