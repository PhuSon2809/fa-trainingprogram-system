import React, { useState, useCallback, useEffect, Fragment } from "react";
import MaterialContainer from "../materialContainer/MaterialContainer";
import ImportModal from "../ImportModal";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import "./TrainingMaterial.styles.scss";
import { ToastContainer } from "react-toastify";


import { useSelector, useDispatch } from "react-redux";

function Training_material({ syllabusID, popupData, setPopupData }) {
  const [privData, setPrivData] = useState(popupData);

  const { dayNo, unit, lesson } = privData;

  if (privData.lesson !== popupData.lesson) setPrivData(popupData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = useCallback(
    () => setIsModalOpen(!isModalOpen),
    [isModalOpen]
  );

  return (
    <div
      onClick={() => {
        if (popupData && !isModalOpen) {
          setPopupData(null);
        }
      }}
      className={`layout-training-material tmc-showed-${
        popupData ? true : false
      }`}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className={`training-material-container`}
      >
        <div className="tm-header">
          <span className="tm-day">Day {dayNo || popupData?.dayNo}</span>
          <button
            onClick={() => {
              setPopupData(null);
            }}
            className="tm-exit-icon"
          >
            <CancelOutlinedIcon fontSize="medium" />
          </button>
        </div>

        <div className="tm-body">
          <div className="tm-title">
            <span className="tm-unit">
              Unit {unit?.unitNo || popupData?.unit?.unitNo}
            </span>
            <span className="tm-lesson">
              {unit?.name || popupData?.unit?.name}
            </span>
          </div>
          <div className="tm-material">
            <span className="material-lesson-name">
              {lesson?.name || popupData?.lesson?.name}
            </span>
            {lesson
              ? lesson.materials.map((material, index) => (
                  <MaterialContainer
                    key={index}
                    index={index}
                    privData={privData}
                    setPrivData={setPrivData}
                    syllabusID={syllabusID}
                  />
                ))
              : popupData.lesson?.materials.map((material, index) => (
                  <MaterialContainer
                    key={index}
                    index={index}
                    privData={popupData}
                    setPrivData={setPopupData}
                    syllabusID={syllabusID}
                  />
                ))}
          </div>
          <button onClick={handleChange} className="tm-upload-btn">
            <span className="upload-btn-name">Upload new</span>
          </button>
        </div>
      </div>

      <ImportModal
        syllabusID={syllabusID}
        lessonID={lesson?.id}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        privData={privData}
        setPrivData={setPrivData}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        limit={1}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Training_material;
