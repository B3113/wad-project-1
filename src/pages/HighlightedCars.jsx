import React, { useState, useEffect } from "react";
import carData from "../data/taladrod-cars.json";

const HighlightedCars = () => {
  const [highlightedCars, setHighlightedCars] = useState([]);

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem("highlightedCars")) || [];
    setHighlightedCars(savedCars);
  }, []);

  const handleAddCar = (car) => {
    const updatedCars = [...highlightedCars, car];
    setHighlightedCars(updatedCars);
    localStorage.setItem("highlightedCars", JSON.stringify(updatedCars));
  };

  const handleRemoveCar = (car) => {
    const updatedCars = highlightedCars.filter((c) => c.id !== car.id);
    setHighlightedCars(updatedCars);
    localStorage.setItem("highlightedCars", JSON.stringify(updatedCars));
  };

  return (
    <div>
      <h1>Highlighted Cars</h1>
      <ul>
        {highlightedCars.map((car) => (
          <li key={car.Cid}>
            {car.Model}
            <button onClick={() => handleRemoveCar(car)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Add Cars</h2>
      <ul>
        {carData.Cars.map((car) => (
          <li key={car.Cid}>
            {car.Model}
            <button onClick={() => handleAddCar(car)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HighlightedCars;
