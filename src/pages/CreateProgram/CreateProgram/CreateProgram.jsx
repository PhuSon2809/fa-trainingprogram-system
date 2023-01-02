import React from "react";
import classNames from "classnames/bind";
import Combobox from "./Combobox";
import PageHeaderCreateTraining from "./PageHeaderCreateTraining";
import SavingButton from "./SavingButton";
import SyllabusCreate from "./SyllabusCreate";
import styles from "./createProgram.scss";

const cx = classNames.bind(styles);

function CreateProgram() {
  return (
    <div className={cx("createProgram")}>
      <div className={cx("content-header")}>
        <PageHeaderCreateTraining />
        <div className={cx("content-inner")}>
          <div className={cx("title")}>
            <p className={cx("text-title")}>Content</p>
          </div>
          <div className={cx("lable-select-syllabus")}>
            <span className={cx("text")}>Select syllabus</span>
            <div>
              <Combobox />
            </div>
          </div>
          <div className={cx("syllabus-content")}>
            <SyllabusCreate />
          </div>
        </div>
      </div>
      <SavingButton />
    </div>
  );
}

export default CreateProgram;
