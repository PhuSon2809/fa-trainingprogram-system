import React from "react";
import TimeAllocation from "./timeAllocation/TimeAllocation";

import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import "./Others.scss";

import { Divider } from "@mui/material";

const textDivider = (text) => {
  let sentences = "";
  if (!text) {
    return "";
  } else {
    let beautifyText = text;
    while (beautifyText.indexOf("..") >= 0) {
      beautifyText = text.replace(/\../g, ".");
    }
    sentences = beautifyText.split(".");
  }
  sentences.pop();
  return sentences;
};

function SyllabusOthers({ detail }) {
  const { data } = detail;
  return (
    <div className="container-Other">
      <TimeAllocation data={data} />
      <div className="AssessmentScheme_card">
        <div className="AssessmentScheme_card_header">Assessment Scheme </div>

        <div className="AssessmentScheme_card_content">
          <div className="AssessmentScheme_container_1">
            <div className="AssessmentScheme_block">
              <p className="AssessmentScheme_text">Quiz *</p>
              <div className="AssessmentScheme_textBox">
                <span>{data?.assessmentScheme?.quiz * 100}%</span>
              </div>
            </div>
            <div className="AssessmentScheme_block">
              <p className="AssessmentScheme_text">Assignment *</p>
              <div className="AssessmentScheme_textBox">
                <span>{data?.assessmentScheme?.assignment * 100}%</span>
              </div>
            </div>
            <div className="AssessmentScheme_block">
              <p className="AssessmentScheme_text">Final *</p>
              <div className="AssessmentScheme_textBox">
                <span>{data?.assessmentScheme?.finalPoint * 100}%</span>
              </div>
            </div>
          </div>
          <Divider variant="middle" light={true} className="divider" />
          <div className="AssessmentScheme_container_2">
            <div className="AssessmentScheme_block">
              <p className="AssessmentScheme_text">Final Theory *</p>
              <div className="AssessmentScheme_textBox">
                <span>{data?.assessmentScheme?.finalTheory * 100}%</span>
              </div>
            </div>
            <div className="AssessmentScheme_block">
              <p className="AssessmentScheme_text">Final Practice *</p>
              <div className="AssessmentScheme_textBox">
                <span>{data?.assessmentScheme?.finalPractice * 100}%</span>
              </div>
            </div>
          </div>
          <Divider variant="middle" light={true} className="divider" />
          <div className="AssessmentScheme_container_3">
            <div className="AssessmentScheme_block">
              <p
                className="AssessmentScheme_text"
                style={{ fontWeight: "bold" }}
              >
                Passing criteria
              </p>
            </div>
            <div className="AssessmentScheme_block">
              <p className="AssessmentScheme_text">GPA *</p>
              <div className="AssessmentScheme_textBox">
                <span>{data?.assessmentScheme?.gpa * 100}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="TrainingDeliveryPrinciple_card">
        <div className="TrainingDeliveryPrinciple_card_header">
          Training delivery principle
        </div>
        <div className="principle">
          <div className="principle-header">
            <VerifiedUserOutlinedIcon fontSize="medium" color="primary" />
            <strong className="principle-title">Training</strong>
          </div>
          <span className="principle-content">
            {data?.deliveryPrinciple?.training}
          </span>
        </div>
        <div className="principle">
          <div className="principle-header">
            <VerifiedUserOutlinedIcon fontSize="medium" color="primary" />
            <strong className="principle-title">Re&minus;test</strong>
          </div>
          <span className="principle-content">
            {data?.deliveryPrinciple?.re_test}
          </span>
        </div>
        <div className="principle">
          <div className="principle-header">
            <VerifiedUserOutlinedIcon fontSize="medium" color="primary" />
            <strong className="principle-title">Marking</strong>
          </div>
          <span className="principle-content">
            {data?.deliveryPrinciple?.marking}
          </span>
        </div>
        <div className="principle">
          <div className="principle-header">
            <VerifiedUserOutlinedIcon fontSize="medium" color="primary" />
            <strong className="principle-title">Waiver Criteia</strong>
          </div>
          <span className="principle-content">
            {data?.deliveryPrinciple?.waiverCriteria}
          </span>
        </div>
        <div className="principle">
          <div className="principle-header">
            <VerifiedUserOutlinedIcon fontSize="medium" color="primary" />
            <strong className="principle-title">Others</strong>
          </div>
          <span className="principle-content">
            {data?.deliveryPrinciple?.others}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SyllabusOthers;
