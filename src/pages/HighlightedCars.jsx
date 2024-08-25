import React, { useEffect, useState } from "react";
import {
  Button,
  Select,
  SelectItem,
  Card,
  CardHeader,
  CardBody,
  Image,
  card,
} from "@nextui-org/react";

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
    <div className="mt-6 flex flex-col w-screen items-center">
      <div className="flex gap-4">
        <Select
          label="Highlight Cars"
          placeholder="Select a car"
          selectionMode="multiple"
          className="w-[250px] lg:w-[550px] rounded-full"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {cars.map((item) => (
            <SelectItem key={item.Cid}>{item.NameMMT}</SelectItem>
          ))}
        </Select>
        <Button
          onClick={handleSave}
          color="success"
          variant="shadow"
          className="h-14 w-32 rounded-2xl text-white"
          endContent={
            // plus icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          }
        >
          Add
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
        {savedCars.map((car) => (
          <Card className=" mt-3 p-2">
            <CardBody className="overflow-visible  justify-between">
              <div>
                <img
                  src={car.Img600}
                  alt={car.NameMMT}
                  className="w-full h-56 object-cover rounded-2xl"
                />
                <div className="flex flex-col mt-4">
                  <p className="text-tiny uppercase font-bold">{car.NameMMT}</p>
                  <p className="text-default-500">
                    Price: {car.Prc} {car.Currency}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleRemove(car.Cid)}
                className="mt-4"
                color="danger"
                variant="bordered"
                size="sm"
              >
                Remove
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
