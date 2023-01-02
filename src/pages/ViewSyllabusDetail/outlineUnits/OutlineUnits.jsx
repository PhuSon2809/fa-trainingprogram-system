import React, { useState } from "react";
// import { Accordion } from "react-bootstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';

import "./OutlineUnits.styles.scss";
import OutlineLessons from "../outlineLessons";


function Outline_unit({dayNo, unit, index, setPopupData }) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Accordion className="accordion-item-unit">
      <AccordionSummary 
        aria-controls={"panel-units-content-" + index}
        id={"panel-units-header-" + index}
        className="accordion-header-unit"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        <div className="unit-number">Unit {unit.unitNo}</div>
        <div className="unit-info">
          <div className="unit-name">{unit.name}</div>
          <div className="unit-duration">{unit.duration} hrs</div>
        </div>
        <ArrowDropDownCircleOutlinedIcon fontSize="medium"
          className={
            (collapsed ? "unit-collapsed" : "unit-showed") + " icon-unit"
          }
        />
      </AccordionSummary>
      <AccordionDetails>
        {unit.syllabusUnitChapters.map((lesson, index) => (
            <OutlineLessons dayNo={dayNo} unit={unit} setPopupData={setPopupData} lesson={lesson} index={index} key={index}/>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default Outline_unit;
