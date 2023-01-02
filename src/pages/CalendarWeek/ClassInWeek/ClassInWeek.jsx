import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ClassInWeek.module.scss";

const cx = classNames.bind(styles);

function ClassInWeek({ classItem }) {
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (classItem.studyForm === "intern") {
      setClassName("intern");
    } else if (classItem.studyForm === "fresher") {
      setClassName("fresher");
    } else if (classItem.studyForm === "online") {
      setClassName("online");
    } else if (classItem.studyForm === "offline") {
      setClassName("offline");
    }
  }, [classItem.studyForm]);

  return (
    <div className={cx("box-class")}>
      <div className={cx("class-in-week", className)}>
        <p className={cx("class-code")}>{classItem.code}</p>
      </div>
    </div>
  );
}

ClassInWeek.propTypes = {
  classItem: PropTypes.object,
};


export default ClassInWeek;
