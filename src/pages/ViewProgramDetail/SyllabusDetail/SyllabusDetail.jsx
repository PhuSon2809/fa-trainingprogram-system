import React from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DayDetail from "~/container/DayDetail";
import styles from "./SyllabusDetail.module.scss";

const cx = classNames.bind(styles);

function SyllabusDetail() {
  const { syllabusID } = useParams();
  const trainingProgramDetail = useSelector(
    (state) => state.trainingProgram.trainingProgram
  );

  return (
    <>
      {trainingProgramDetail.syllabusOfProgramDTOList?.map((syllabus) => (
        <div key={syllabus.id}>
          {syllabus.id === syllabusID && (
            <div className={cx("syllabus-detail")}>
              <div className={cx("content")}>
                {syllabus.syllabusDays.map((syllabusDay) => (
                  <DayDetail key={syllabusDay.id} syllabusDay={syllabusDay} />
                ))}
              </div>
              <div className={cx("scroll")}></div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default SyllabusDetail;
