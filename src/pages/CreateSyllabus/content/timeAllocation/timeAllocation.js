import React from "react";
import "./timeAllocation.scss";
import PieChart from "./PieChart";

function TimeAllocation(props) {
  const { dataOfTime } = props;
  return (
    <>
      <div className="TimeAllocation_card">
        <div className="TimeAllocation_card_header">Time Allocation</div>
        <div className="TimeAllocation_PieChart">
          <div className="asdasd">
            <PieChart dataOfTime={dataOfTime} />
          </div>
          <div className="PieChart_list">
            <ul className="timeallocation_content_items">
              <li className="A_Lab">
                <span>Assignment/Lab ({dataOfTime[0]}%)</span>
              </li>
              <li className="C_Lec">
                <span>Concept/Lecture ({dataOfTime[1]}%)</span>
              </li>
              <li className="G_Rev">
                <span>Guide/Review ({dataOfTime[2]}%)</span>
              </li>
              <li className="T_Qui">
                <span>Test/Quiz ({dataOfTime[3]}%)</span>
              </li>
              <li className="Exam">
                <span>Exam ({dataOfTime[4]}%)</span>
              </li>
              <li className="Semi">
                <span>Semiar/Workshop ({dataOfTime[5]}%)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default TimeAllocation;
