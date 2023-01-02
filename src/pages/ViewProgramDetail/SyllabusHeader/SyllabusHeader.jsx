import React from "react";
import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "~/components/Button";
import { EastIcon } from "~/components/Icons";
import LabelStatus from "~/components/LabelStatus";
import styles from "./SyllabusHeader.module.scss";

const cx = classNames.bind(styles);

function SyllabusHeader() {
  const { syllabusID } = useParams();
  const trainingProgramDetail = useSelector(
    (state) => state.trainingProgram.trainingProgram
  );

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/syllabus/view_syllabus/${syllabusID}`);
  };

  return (
    <>
      {trainingProgramDetail.syllabusOfProgramDTOList?.map((syllabus) => (
        <div key={syllabus.id}>
          {syllabus.id === syllabusID && (
            <div className={cx("syllabus-header")}>
              <div className={cx("title")}>
                <div className={cx("program-name")}>
                  <div className={cx("text")}>
                    <p>{syllabus.name}</p>
                    {syllabus.status === "ACTIVE" ? (
                      <LabelStatus active>Active</LabelStatus>
                    ) : (
                      <LabelStatus inactive>Inactive</LabelStatus>
                    )}
                  </div>
                </div>
                <Tippy content="Go to Syllabus">
                  <div>
                    <Button
                      onClick={handleNavigation}
                      className={cx("action-btn")}
                      leftIcon={<EastIcon />}
                      primary
                    />
                  </div>
                </Tippy>
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
          )}
        </div>
      ))}
    </>
  );
}

export default SyllabusHeader;
