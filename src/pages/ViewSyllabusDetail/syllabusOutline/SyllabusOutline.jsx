import React, { useEffect, useState } from "react";
// import { Accordion } from "react-bootstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TrainingMaterial from "../trainingMaterial";
import OutlineUnits from "../outlineUnits";
import TimeAllocation from "../timeAllocation";

import "./SyllabusOutline.styles.scss";

function Syllabus_outline({ detail, setIsChanged }) {
  const { data } = detail;
  const [popupData, setPopupData] = useState(); 
  return (
    <div className="outline-container">
      <div className="outline-wrapper">
        {data?.syllabusDays? data.syllabusDays.map((value, index) => (
          <Accordion key={index} className="accordion-item-outline">
            <AccordionSummary
              aria-controls={"panel-outline-" + index + "-content"}
              id={"panel-outline-" + index + "header"}
              className="accordion-header-outline"
            >
              Day {value.dayNo}
            </AccordionSummary>
            <AccordionDetails>
              <div className="units-wrapper">
                {value.syllabusUnits.map((unit, index) => (
                  <div key={index}>
                    {" "}
                    <OutlineUnits
                      dayNo={value.dayNo}
                      unit={unit}
                      setPopupData={setPopupData}
                      index={index}
                      key={index}
                    />{" "}
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        )):""}
      </div>
      {popupData ? (
        <TrainingMaterial
          syllabusID={data?.id}
          popupData={popupData}
          setPopupData={setPopupData}
          setIsChanged={setIsChanged}
        />
      ) : (
        ""
      )}
      <TimeAllocation data={data} />
    </div>
  );
}

export default Syllabus_outline;
