import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./DayDetail.module.scss";
import UnitDetail from "../UnitDetail";

const cx = classNames.bind(styles);

function DayDetail({ syllabusDay }) {
  const [show, setShow] = useState(false);

  const toggleDay = () => {
    setShow(!show);
  };

  return (
    <div
      className={
        show
          ? cx("accordition-detail", "accordition-detail-open")
          : cx("accordition-detail")
      }
    >
      <div
        id="title"
        className={show ? cx(`title`, "title-open") : cx("title")}
        onClick={() => toggleDay(syllabusDay)}
      >
        <p>Day {syllabusDay.dayNo}</p>
      </div>
      {show && (
        <>
          {syllabusDay.syllabusUnits.map((unit) => (
            <UnitDetail key={unit.id} unit={unit} dayNo={syllabusDay.dayNo} />
          ))}
        </>
      )}
    </div>
  );
}

DayDetail.propTypes = {
  syllabusDay: PropTypes.object,
};

export default DayDetail;
