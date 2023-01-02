import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./UnitDetail.module.scss";
import { ArrowDropDownCircleIcon } from "~/components/Icons";
import Button from "~/components/Button";
import ChapterDetail from "../ChapterDetailList";

const cx = classNames.bind(styles);

function UnitDetail({ unit, dayNo }) {
  const [showDetail, setShowDetail] = useState(false);

  const handleShowDetail = () => {
    setShowDetail(!showDetail);
  };

  return (
    <>
      <div className={cx("unit")}>
        <div className={cx("unit-title")}>
          <div className={cx("content")}>
            <p className={cx("name")}>Unit {unit.unitNo}</p>
            <div className={cx("detail")}>
              <p>{unit.name}</p>
              <i>{unit.duration}hrs</i>
            </div>
          </div>
          <Button
            className={cx("action-btn", showDetail ? "show" : null)}
            onClick={handleShowDetail}
          >
            <ArrowDropDownCircleIcon />
          </Button>
        </div>
        {showDetail && (
          <ChapterDetail
            syllabusUnitChapters={unit.syllabusUnitChapters}
            showDetail={showDetail}
            unitNo={unit.unitNo}
            dayNo={dayNo}
          />
        )}
      </div>
      <div className={cx("line")}></div>
    </>
  );
}

UnitDetail.propTypes = {
  unit: PropTypes.object,
};

export default UnitDetail;
