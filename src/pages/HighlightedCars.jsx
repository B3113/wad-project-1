import React, { useEffect, useState } from "react";
import { Button, Select, SelectItem } from "@nextui-org/react";

import carData from "../data/taladrod-cars.json";

export default function HighlightedCars() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [savedCars, setSavedCars] = useState([]);

  useEffect(() => {
    const { Cars, MMList } = carData;
    setCars(Cars);
    setBrands(MMList);

    const saved = JSON.parse(localStorage.getItem("savedCars")) || [];
    setSavedCars(saved);
  }, []);

  const handleSave = () => {
    const selectedArray = Array.from(selectedKeys);

    const selectedCars = cars.filter((car) =>
      selectedArray.includes(car.Cid.toString())
    );

    const updatedCars = cars.filter(
      (car) => !selectedArray.includes(car.Cid.toString())
    );

    setCars(updatedCars);

    const newSavedCars = [...savedCars, ...selectedCars];
    setSavedCars(newSavedCars);
    localStorage.setItem("savedCars", JSON.stringify(newSavedCars));

    setSelectedKeys(new Set());
  };

  const handleRemove = (id) => {
    const updatedSavedCars = savedCars.filter((car) => car.Cid !== id);
    setSavedCars(updatedSavedCars);
    localStorage.setItem("savedCars", JSON.stringify(updatedSavedCars));

    const removedCar = savedCars.find((car) => car.Cid === id);
    setCars([...cars, removedCar]);
  };

  return (
    <div className=" flex flex-col w-screen items-center">
      <div className="flex gap-4">
        <Select
          label="Highlight Cars"
          placeholder="Select a car"
          selectionMode="multiple"
          className="w-[550px] rounded-full"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {cars.map((item) => (
            <SelectItem key={item.Cid}>{item.NameMMT}</SelectItem>
          ))}
        </Select>
        <Button
          onClick={handleSave}
          color="primary"
          variant="light"
          className="h-12 rounded-full"
        >
          Add
        </Button>
      </div>

      <div className="mt-4 flex">
        <ul>
          {savedCars.map((car) => (
            <li key={car.Cid} className="flex items-center gap-4 mb-2">
              <img src={car.Img100} alt={car.NameMMT} className="w-20 h-20" />
              <div>
                <p>{car.NameMMT}</p>
                <p>
                  Price: {car.Prc} {car.Currency}
                </p>
              </div>
              <Button
                onClick={() => handleRemove(car.Cid)}
                color="error"
                variant="light"
                size="sm"
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
