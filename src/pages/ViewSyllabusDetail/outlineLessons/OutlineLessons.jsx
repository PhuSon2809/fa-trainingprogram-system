import React, { useState } from "react";
import "./OutlineLessons.styles.scss";
import { deliveryTypes } from "./deliveryIcon";
import { FolderIcon } from "~/components/Icons";

function Outline_lesson({ dayNo, unit, lesson, index, setPopupData }) {
  const { name, outputStandard, duration, online, deliveryType } = lesson;

  return (
    <div className="wrap-lesson">
      <div className="lesson-item lesson-name">{name}</div>
      <div className="lesson-item lessson-outputStandard">
        <span className="outputStandard-content">{outputStandard?.code}</span>
        <div className="outputStandard-tooltip">
          <h6 className="outputStandard-tooltip-header">Coding Standard</h6>
          <p className="outputStandard-tooltip-content">
            {outputStandard?.description}
          </p>
        </div>
      </div>

      <div className="lesson-item lesson-duration">{duration} mins</div>
      <div className={`"lesson-item lesson-status status-${online ? "online": "offline"}`}>
        <span className="status-content">{online ? "online": "offline"}</span>
      </div>
      <div className="lesson-item lesson-deliveryType lesson-icon">
        {deliveryTypes.filter((type) => type.name.match(deliveryType.name))[0].icon}
        <div className="deliveryType-tooltip">
          <div className="deliveryType-tooltip-header">{deliveryType.name}</div>
        </div>
      </div>
      <button
        onClick={() => {
          setPopupData({dayNo, unit, lesson})
        }}
        className="lesson-item lesson-folder lesson-icon"
      >
        <FolderIcon />
      </button>
    </div>
  );
}

export default Outline_lesson;
