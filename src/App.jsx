import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import HighlightedCars from "./pages/HighlightedCars";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div id="sidebar">
        <nav>
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
