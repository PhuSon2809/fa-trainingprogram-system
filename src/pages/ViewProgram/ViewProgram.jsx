import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Syllabus from "~/container/Syllabus";
import TrainingProgramLayout from "~/layouts/TrainingProgramLayout";
import { getTrainingProgramDetail } from "~/redux/actions/trainingProgram";
import styles from "./ViewProgram.module.scss";

const cx = classNames.bind(styles);

function ViewProgram() {
  const { programID } = useParams();
  const trainingProgramDetail = useSelector(
    (state) => state.trainingProgram.trainingProgram
  );
  // console.log(trainingProgramDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrainingProgramDetail(programID));
  }, [programID, dispatch]);

  return (
    <>
      {trainingProgramDetail ? (
        <TrainingProgramLayout>
          <div className={cx("content")}>
            <div className={cx("title")}>
              <p>Content</p>
            </div>
            <Syllabus />
          </div>
        </TrainingProgramLayout>
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            sx={{
              color: "#285d9a",
            }}
            size={70}
          />
        </Box>
      )}
    </>
  );
}

export default ViewProgram;
