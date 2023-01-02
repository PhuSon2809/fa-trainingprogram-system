import React, { useState } from "react";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "~/components/Button";
import config from "~/config";
import { setTrainingProgramName } from "../../../redux/actions/trainingProgram";
import styles from "./createProgramName.scss";

const cx = classNames.bind(styles);

function CreateProgramName() {
  const dispatch = useDispatch();
  const [inputName, setInputName] = useState("");

  return (
    <div className={cx("container_wrap")}>
      <div className={cx("page-header")}>
        <p className={cx("title")}>New Training program</p>
      </div>

      <div className={cx("program-meta-data")}>
        <div className={cx("program-name")}>
          <p className={cx("text-program-name")}>Program name*</p>
          <div>
            <form className={cx("form-input-program-name")}>
              <input
                required
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className={cx("lable-input")}
                placeholder="Type program name"
              />
              <span>
                {inputName ? (
                  <Link to={config.routes.createProgram}>
                    <Button
                      onClick={() =>
                        dispatch(setTrainingProgramName(inputName))
                      }
                      className={cx("button-create")}
                    >
                      Create
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => dispatch(setTrainingProgramName(inputName))}
                    className={cx("button-create")}
                  >
                    Create
                  </Button>
                )}
              </span>
            </form>
          </div>
        </div>
      </div>

      <div className={cx("line")}></div>
    </div>
  );
}

export default CreateProgramName;
