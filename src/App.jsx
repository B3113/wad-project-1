import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import HighlightedCars from "./pages/HighlightedCars";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div id="sidebar">
        <nav className="flex gap-5 mt-4 p-4">
          <p className="font-bold">Car Analytics</p>
          <a href={`/`}>Dashboard</a>
          <a href={`/highlighted`}>Highlight</a>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
