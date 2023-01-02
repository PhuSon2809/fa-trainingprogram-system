import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({percentages}) {
  const data = {
    labels: [
      "Assignment/Lab",
      "Concept/Lecture",
      "Guide/Review",
      "Test/Quiz",
      "Exam",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: percentages,
        backgroundColor: [
          "#F4BE37",
          "#FF9F40",
          "#0D2535",
          "#5388D8",
          "#206EE6",
        ],
        borderColor: ["#F4BE3733", "#FF9F4033", "#0D253533", "#5388D833", "#206EE633"],
        borderWidth:0.5
      }
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return <Pie data={data} options={options} />;
}
export default PieChart;
