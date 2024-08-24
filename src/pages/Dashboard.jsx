import React, { useEffect, useState } from "react";
import CarTable from "../components/CarTable";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import carData from "../data/taladrod-cars.json";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [carStats, setCarStats] = useState({ brands: {}, total: 0 });

  useEffect(() => {
    const stats = processCarData(carData);
    setCarStats(stats);
  }, []);

  const processCarData = (data) => {
    const brands = {};
    let total = 0;

    const { Cars, MMList } = data;

    console.log("MMList:", MMList);
    console.log("Cars:", Cars);

    if (!MMList) {
      console.error("MMList is undefined!");
      return { brands, total };
    }

    if (!Cars) {
      console.error("Cars is undefined!");
      return { brands, total };
    }

    const mkIdToBrand = {};
    MMList.forEach((item) => {
      mkIdToBrand[item.mkID] = item.Name;
    });

    Cars.forEach((car) => {
      const brandName = mkIdToBrand[car.MkID];

      if (!brands[brandName]) {
        brands[brandName] = { total: 0, models: {} };
      }
      brands[brandName].total += parseFloat(car.Prc.replace(/,/g, ""));
      total += parseFloat(car.Prc.replace(/,/g, ""));

      if (!brands[brandName].models[car.Model]) {
        brands[brandName].models[car.Model] = 0;
      }
      brands[brandName].models[car.Model] += parseFloat(
        car.Prc.replace(/,/g, "")
      );
    });

    return { brands, total };
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <CarTable carStats={carStats} />
      <PieChart carStats={carStats} />
      <BarChart carStats={carStats} />
    </div>
  );
};

export default Dashboard;
