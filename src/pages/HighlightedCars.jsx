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
          color="primary"
          variant="light"
          className="h-12 rounded-full"
        >
          Add
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
        {savedCars.map((car) => (
          <Card className=" mt-3">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <div className="items-center flex flex-col">
                <p className="text-tiny uppercase font-bold">{car.NameMMT}</p>
                <p className="text-default-500">
                  Price: {car.Prc} {car.Currency}
                </p>
              </div>
            </CardHeader>
            <CardBody className="overflow-visible py-2 items-center mt-1">
              <img
                src={car.Img100}
                alt={car.NameMMT}
                className="w-[180px] h-[160px] object-cover rounded-2xl"
              />

              <Button
                onClick={() => handleRemove(car.Cid)}
                className="mt-1"
                color="danger"
                variant="light"
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
