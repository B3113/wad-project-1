import React from "react";

const CarTable = ({ carStats }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Brand</th>
          <th>Model</th>
          <th>Total Value (Baht)</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(carStats.brands).map(([brand, { total, models }]) => {
          const formattedTotal = isNaN(Number(total))
            ? "N/A"
            : Number(total).toLocaleString("en-TH");

          return (
            <React.Fragment key={brand}>
              <tr>
                <td>{brand}</td>
                <td></td>
                <td>{formattedTotal}</td>
              </tr>
              {Object.entries(models).map(([model, value]) => {
                const formattedValue = isNaN(Number(value))
                  ? "N/A"
                  : Number(value).toLocaleString("en-TH");

                return (
                  <tr key={model}>
                    <td></td>
                    <td>{model}</td>
                    <td>{formattedValue}</td>
                  </tr>
                );
              })}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default CarTable;
