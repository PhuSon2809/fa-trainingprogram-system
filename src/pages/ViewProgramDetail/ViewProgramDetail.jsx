import React, { useEffect } from "react";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import config from "~/config";
import TrainingProgramLayout from "~/layouts/TrainingProgramLayout";
import SyllabusDetail from "./SyllabusDetail/SyllabusDetail";
import SyllabusHeader from "./SyllabusHeader";
import styles from "./ViewProgramDetail.module.scss";
import { useDispatch } from "react-redux";
import { getTrainingProgramDetail } from "~/redux/actions/trainingProgram";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function ViewProgramDetail() {
  const { programID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrainingProgramDetail(programID));
  }, [programID, dispatch]);

  return (
    <TrainingProgramLayout>
      <div className={cx("wrapper")}>
        <div className={cx("content-wrapper")}>
          <div className={cx("content")}>
            <div className={cx("title")}>
              <p>Content</p>
            </div>
            <div className={cx("content-detail")}>
              <SyllabusHeader />
              <SyllabusDetail />
            </div>
            <div className={cx("line")}></div>
          </div>
        </div>

        <div className={cx("action-btn")}>
          <Button primary to={config.routes.viewProgram}>
            Back
          </Button>
        </div>
      </div>
    </TrainingProgramLayout>
  );
}

export default ViewProgramDetail;
