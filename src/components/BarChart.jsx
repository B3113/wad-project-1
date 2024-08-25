import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ carStats }) => {
  const labels = Object.keys(carStats.brands);
  const datasets = Object.keys(carStats.brands).map((brand, index) => ({
    label: brand,
    data: Object.values(carStats.brands[brand].models),
    backgroundColor: `rgba(${(index * 60) % 255}, ${(index * 30) % 255}, ${(index * 90) % 255}, 0.6)`, // Different color for each dataset
    borderColor: `rgba(${(index * 60) % 255}, ${(index * 30) % 255}, ${(index * 90) % 255}, 1)`, // Border color for better distinction
    borderWidth: 1,
    stack: 'stack1',
  }));

  const data = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Car Models Distribution by Brand',
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;

