import React from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import "tippy.js/animations/perspective.css";
import { DragIndicatorIcon } from "~/components/Icons";
import ChapterDetail from "../ChapterDetail/ChapterDetail";
import styles from "./ChapterDetailList.module.scss";

const cx = classNames.bind(styles);

function ChapterDetailList({ syllabusUnitChapters, unitNo, dayNo }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("drag")}>
          <DragIndicatorIcon />
        </div>
        <div className={cx("list-lesson")}>
          {syllabusUnitChapters.map((chapter) => (
            <ChapterDetail
              key={chapter.id}
              chapter={chapter}
              unitNo={unitNo}
              dayNo={dayNo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

ChapterDetailList.propTypes = {
  syllabusUnitChapters: PropTypes.array,
};

export default ChapterDetailList;
