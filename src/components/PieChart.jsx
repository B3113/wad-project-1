import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ carStats }) => {
  const data = {
    labels: Object.keys(carStats.brands),
    datasets: [
      {
        data: Object.values(carStats.brands).map((brand) => brand.total),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Car Distribution by Brand</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
