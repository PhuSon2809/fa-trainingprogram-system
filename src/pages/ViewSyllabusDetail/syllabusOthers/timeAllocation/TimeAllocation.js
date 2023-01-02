import React, { useEffect } from "react";
import PieChart from "./PieChart";
import "./TimeAllocation.styles.scss";

const typeCounting = (data) => {
  const deliveryTypes = {
    types: [
      { name: "Assignment/Lab", amount: 0 },
      { name: "Concept/Lecture", amount: 0 },
      { name: "Guide/Review", amount: 0 },
      { name: "Test/Quiz", amount: 0 },
      { name: "Exam", amount: 0 },
    ],
    total: 0,
  };

  data?.syllabusDays.forEach((day) => {
    day?.syllabusUnits.forEach((unit) => {
      unit?.syllabusUnitChapters.forEach((lesson) => {
        deliveryTypes?.types.forEach((type) => {
          if (type?.name.match(lesson.deliveryType.name)) {
            type.amount++;
            deliveryTypes.total++;
          }
        });
      });
    });
  });

  return deliveryTypes;
};

const percentageCalculate = (amount, total) => {
  return Math.round((amount / total) * 100);
};


function TimeAllocation({ data }) {
  const deliveryTypes = typeCounting(data);
  const { types, total } = deliveryTypes;

  const percentages = types.map((type) =>
    percentageCalculate(type.amount, total)
  );

  return (
    <div className="time-allocation-other">
      <div className="time-allocation-header">
        <span className="time-allocation-header-text">Time allocation</span>
      </div>

      <div className="time-allocation-content">
        <div className="pie-chart">
          <PieChart percentages={percentages} />
        </div>
        <ul className="time-allocation-content-items">
          <li className="ass-lab tac-item">
            <span className="tac-item-content">Assignment/Lab</span>
            <span className="tac-item-percent">({percentages[0]}%)</span>
          </li>
          <li className="con-lec tac-item">
            <span className="tac-item-content">Concept/Lecture</span>
            <span className="tac-item-percent">({percentages[1]}%)</span>
          </li>
          <li className="gui-rev tac-item">
            <span className="tac-item-content">Guide/Review</span>
            <span className="tac-item-percent">({percentages[2]}%)</span>
          </li>
          <li className="tes_qui tac-item">
            <span className="tac-item-content">Test/Quiz</span>
            <span className="tac-item-percent">({percentages[3]}%)</span>
          </li>
          <li className="exam tac-item">
            <span className="tac-item-content">Exam</span>
            <span className="tac-item-percent">({percentages[4]}%)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TimeAllocation;
