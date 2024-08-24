import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ carStats }) => {
  const labels = Object.keys(carStats.brands);
  const datasets = Object.keys(carStats.brands).map((brand) => ({
    label: brand,
    data: Object.values(carStats.brands[brand].models),
    backgroundColor: "#36A2EB",
  }));

  const data = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <div>
      <h2>Car Models Distribution by Brand</h2>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
