import React from "react";

const tableContainerStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "20px",
};

const tableStyle = {
  width: "80%",
  borderCollapse: "collapse",
  fontSize: "16px",
  textAlign: "left",
};

const thStyle = {
  backgroundColor: "#f4f4f4",
  padding: "12px 15px",
  borderBottom: "2px solid #ddd",
  borderRight: "1px solid #ddd", // Add border between columns
  textAlign: "center",
};

const tdStyle = {
  padding: "12px 15px",
  borderBottom: "1px solid #ddd",
  borderRight: "1px solid #ddd", // Add border between columns
  textAlign: "center",
};

// Ensure the last column's right border does not show
const lastColumnStyle = {
  borderRight: "none",
};

// Additional style for the brand name cell
const brandCellStyle = {
  textAlign: "left", // Align brand name to the left
};

const CarTable = ({ carStats }) => {
  return (
    <div style={tableContainerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Brand</th>
            <th style={thStyle}>Model</th>
            <th style={thStyle}>Total Value (Baht)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(carStats.brands).map(([brand, { total, models }]) => {
            const formattedTotal = isNaN(Number(total))
              ? "N/A"
              : Number(total).toLocaleString("en-TH");

            return (
              <React.Fragment key={brand}>
                {/* Display brand total */}
                <tr>
                  <td style={{ ...tdStyle, ...brandCellStyle }} colSpan="2">
                    <strong>{brand}</strong>
                  </td>
                  <td style={tdStyle}>{formattedTotal}</td>
                </tr>
                {/* Display each model under the brand */}
                {Object.entries(models).map(([model, value]) => {
                  const formattedValue = isNaN(Number(value))
                    ? "N/A"
                    : Number(value).toLocaleString("en-TH");

                  return (
                    <tr key={model}>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}>{model}</td>
                      <td style={tdStyle}>{formattedValue}</td>
                    </tr>
                  );
                })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CarTable;


