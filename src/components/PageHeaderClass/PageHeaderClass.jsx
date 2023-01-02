import React from "react";
import classNames from "classnames/bind";
import styles from "./PageHeaderClass.module.scss";
import LabelStatus from "../LabelStatus";
import {
  ExamIcon,
  LectureIcon,
  MoreHorizontalIcon,
  QuizIcon,
  ReviewIcon,
  WorkshopIcon,
} from "../Icons";
import Menu from "../Poper/Menu";
import { LabIcon } from "../Icons";
import { dataClass } from "./dataClass";
const cx = classNames.bind(styles);

function PageHeaderClass(props) {
  console.log(dataClass);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("page-header")}>
        <p className={cx("title")}>{dataClass[0].title}</p>
        <div className={cx("content")}>
          <div className={cx("box")}>
            <p className={cx("name")}>{dataClass[0].name}</p>
            <LabelStatus active>{dataClass[0].active}</LabelStatus>
          </div>
          <Menu>
            <div>
              <MoreHorizontalIcon className={cx("more-btn")} />
            </div>
          </Menu>
        </div>
        <div className={cx("code-class")}>{dataClass[0].codeClass}</div>
        <hr className={cx("line")} />

        <div className={cx("meta-data")}>
          <div className={cx("time")}>
            <p className={cx("days")}>
              <span className={cx("number")}>{dataClass[0].number}</span>
              <span className={cx("day")}> days</span>
            </p>
            <p className={cx("hour")}>{dataClass[0].hours}</p>
            <div className={cx("inline")}>|</div>
            <div className={cx("flex-icon")}>
              <LabIcon />
              <LectureIcon />
              <ReviewIcon />
              <QuizIcon />
              <ExamIcon />
              <WorkshopIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHeaderClass;
