import React, { useEffect, useState } from "react";
import CarTable from "../components/CarTable";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import carData from "../data/taladrod-cars.json";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

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

    if (!MMList || !Cars) {
      console.error("Data missing!");
      return { brands, total };
    }

    const mkIdToBrand = MMList.reduce((acc, item) => {
      acc[item.mkID] = item.Name;
      return acc;
    }, {});

    Cars.forEach((car) => {
      const brandName = mkIdToBrand[car.MkID];

      if (!brands[brandName]) {
        brands[brandName] = { total: 0, models: {} };
      }
      const price = parseFloat(car.Prc.replace(/,/g, ""));
      brands[brandName].total += price;
      total += price;

      if (!brands[brandName].models[car.Model]) {
        brands[brandName].models[car.Model] = 0;
      }
      brands[brandName].models[car.Model] += price;
    });

    return { brands, total };
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Car Dashboard</h1>
      </header>
      <main className="space-y-6">
        {/* Chart Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Car Brands Distribution</h2>
            <PieChart carStats={carStats} />
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Car Price Trends</h2>
            <BarChart carStats={carStats} />
          </div>
        </section>

        {/* Car Table Section */}
        <section className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Car Statistics Table</h2>
          <CarTable carStats={carStats} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

