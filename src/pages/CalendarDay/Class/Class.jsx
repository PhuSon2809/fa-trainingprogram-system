import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import HeadlessTippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import {
  GradeSmallIcon,
  HomeWorkIcon,
  LectureSmallIcon,
} from "~/components/Icons";
import styles from "./Class.module.scss";

const cx = classNames.bind(styles);

function Class({ classItem }) {
  const [className, setClassName] = useState("");
  const [classNamePopup, setClassNamePopup] = useState("");
  const [width, setWidth] = useState(0);

  const classRef = useRef();

  useLayoutEffect(() => {
    setWidth(classRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    if (classItem.classStatus === "Planning") {
      setClassName("intern");
      setClassNamePopup("intern-popup");
    } else if (classItem.classStatus === "Closed") {
      setClassName("fresher");
      setClassNamePopup("fresher-popup");
    } else if (classItem.classStatus === "Opening") {
      setClassName("online");
      setClassNamePopup("online-popup");
    } else if (classItem.classStatus === "Ended") {
      setClassName("offline");
      setClassNamePopup("offline-popup");
    }
  }, [classItem.classStatus]);

  const renderResult = (attrs) => (
    <div className={cx("class-popup")} tabIndex="-1" {...attrs}>
      <div className={cx("content", classNamePopup)} style={{ width: width }}>
        <div className={cx("name")}>
          <p>{classItem.syllabusName}</p>
        </div>
        <div className={cx("lesson")}>
          <div className={cx("day")}>
            <p>
              Day {classItem.dayNo} of {classItem.trainingProgramTotalDays}
            </p>
          </div>

          <div className={cx("unit")}>
            <div className={cx("inner-unit")}>
              <p>Unit {classItem.syllabusUnitNo}</p>
            </div>
            <p className={cx("unit-name")}>{classItem.syllabusUnitName}</p>
          </div>
        </div>
        <div className={cx("infor")}>
          <div className={cx("location")}>
            <div className={cx("tag")}>
              <HomeWorkIcon />
              <p>Location</p>
            </div>
            <p>{classItem.location}</p>
          </div>
          <div className={cx("trainee")}>
            <div className={cx("tag")}>
              <LectureSmallIcon />
              <p>Trainer</p>
            </div>
            <div className={cx("list-link")}>
              {classItem?.admins.map((admin) => (
                <p key={admin.id} className={cx("link")}>
                  {admin.fullname}
                </p>
              ))}
            </div>
          </div>
          <div className={cx("admin")}>
            <div className={cx("tag")}>
              <GradeSmallIcon />
              <p>Admin</p>
            </div>
            <div className={cx("list-link")}>
              {classItem?.trainers.map((trainer) => (
                <p key={trainer.id} className={cx("link")}>
                  {trainer.fullname}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={classRef}>
      <HeadlessTippy
        interactive
        delay={[0, 200]}
        offset={[0, 0]}
        placement="bottom-end"
        render={renderResult}
      >
        <div className={cx("class", className)}>
          <p className={cx("class-code")}>{classItem.classCode}</p>
          <div className={cx("line")}>|</div>
          <p className={cx("subject")}>{classItem.className}</p>
        </div>
      </HeadlessTippy>
    </div>
  );
}

Class.propTypes = {
  classItem: PropTypes.object,
};

export default Class;
