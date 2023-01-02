import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart(props) {
  const {dataOfTime}=props
  const data = {
    datasets: [
      {
        label: "# of Votes",
        data: dataOfTime,
        backgroundColor: [
          "#F4BE37",
          "#FF9F40",
          "#0D2935",
          "#0A1135",
          "#5388D8",
          "#206EE5",
        ],
        borderColor: ["#F4BE37", "#FF9F40", "#0D2935","#0A1135", "#5388D8", "#206EE5"],
      },
    ],
  };
  return <Pie data={data} />;
}
export default PieChart;
