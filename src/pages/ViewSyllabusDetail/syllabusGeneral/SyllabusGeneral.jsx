import React from "react";

import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import FilterCenterFocusOutlinedIcon from "@mui/icons-material/FilterCenterFocusOutlined";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import "./SyllabusGeneral.scss";

function SyllabusGeneral({detail}) {
  const {data}=detail
  return (
    <div className="container-general">
      <div className="col_5">
        <div className="white_box" style={{ display: "grid" }}>
          <div className="flex">
            <div className="col_6">
              <StarBorderOutlinedIcon color="primary"/>
              <strong> Level</strong>
            </div>
            <div className="col_6">
              <p className="general-name">{data?.syllabusLevel?.name}</p>
            </div>
          </div>
          <div className="flex">
            <div className="col_6">
              <GroupOutlinedIcon color="primary"/>
              <strong> Attendee number</strong>
            </div>
            <div className="col_6">
              <p>{data?.attendeeNumber}</p>
            </div>
          </div>
          <div className="flex">
            <div className="col_6">
              <VerifiedUserOutlinedIcon color="primary"/> <strong> Output Standard</strong>
            </div>
            <div className="col_6">
              <div className="label">
                {data?.outputStandardCovered?.map((standard, index) => (
                    <p key={index}>{standard.code}</p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col_7">
        <div className="white_box">
          <div className="flex">
            <SettingsOutlinedIcon color="primary" />
            <strong>Technical Requirement(s)</strong>
          </div>
          <p>
            {data?.technicalRequirement}
          </p>
        </div>
      </div>
      <div className="col_12">
        <div className="white_box">
          <div className="flex">
            <FilterCenterFocusOutlinedIcon color="primary" />
            <strong> Course objectives</strong>
          </div>
          <p>
            {data?.courseObjective}
          </p>  
        </div>
      </div>
    </div>
  );
}

export default SyllabusGeneral;
