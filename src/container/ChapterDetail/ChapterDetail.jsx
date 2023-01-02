import React, { useState } from "react";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import "tippy.js/animations/perspective.css";
import Button from "~/components/Button";
import {
  ExamIcon,
  FolderIcon,
  LabIcon,
  LectureIcon,
  QuizIcon,
  ReviewIcon,
  WorkshopIcon,
} from "~/components/Icons";
import LabelStatus from "~/components/LabelStatus";
import PopupStandard from "../PopupStandard";
import PopupMaterial from "../PopupMaterial";
import styles from "./ChapterDetail.module.scss";

const cx = classNames.bind(styles);

function ChapterDetail({ chapter, unitNo, dayNo }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [chapterName, setchapterName] = useState("");

  const showModal = (chapterName) => {
    setchapterName(chapterName);
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div className={cx("lesson")}>
        <p className={cx("name")}>{chapter.name}</p>
        <div className={cx("infor")}>
          <PopupStandard outputStandard={chapter.outputStandard}>
            <div>
              <LabelStatus standard>{chapter.outputStandard.code}</LabelStatus>
            </div>
          </PopupStandard>
          <p className={cx("time")}>{chapter.duration}mins</p>
          {chapter.online === false ? (
            <LabelStatus offline>Offline</LabelStatus>
          ) : (
            <LabelStatus online>Online</LabelStatus>
          )}

          {chapter.deliveryType.name === "Assignment/Lab" && (
            <Tippy animation="perspective" content={chapter.deliveryType.name}>
              <span className={cx("icon-hover")}>
                <LabIcon />
              </span>
            </Tippy>
          )}
          {chapter.deliveryType.name === "Concept/Lecture" && (
            <Tippy animation="perspective" content={chapter.deliveryType.name}>
              <span className={cx("icon-hover")}>
                <LectureIcon />
              </span>
            </Tippy>
          )}
          {chapter.deliveryType.name === "Guide/Review" && (
            <Tippy animation="perspective" content={chapter.deliveryType.name}>
              <span className={cx("icon-hover")}>
                <ReviewIcon />
              </span>
            </Tippy>
          )}
          {chapter.deliveryType.name === "Test/Quiz" && (
            <Tippy animation="perspective" content={chapter.deliveryType.name}>
              <span className={cx("icon-hover")}>
                <QuizIcon />
              </span>
            </Tippy>
          )}
          {chapter.deliveryType.name === "Exam" && (
            <Tippy animation="perspective" content={chapter.deliveryType.name}>
              <span className={cx("icon-hover")}>
                <ExamIcon />
              </span>
            </Tippy>
          )}
          {chapter.deliveryType.name === "Seminar/Workshop" && (
            <Tippy animation="perspective" content={chapter.deliveryType.name}>
              <span className={cx("icon-hover")}>
                <WorkshopIcon />
              </span>
            </Tippy>
          )}

          <Button
            onClick={() => showModal(chapter.name)}
            className={cx("icon-popup")}
            leftIcon={<FolderIcon />}
          />
        </div>
      </div>
      <PopupMaterial
        chapterId={chapter.id}
        materials={chapter.materials}
        chapterName={chapterName}
        modalOpen={modalOpen}
        showModal={showModal}
        unitNo={unitNo}
        dayNo={dayNo}
      />
    </>
  );
}

ChapterDetail.propTypes = {
  syllabusUnitChapters: PropTypes.array,
};

export default ChapterDetail;
