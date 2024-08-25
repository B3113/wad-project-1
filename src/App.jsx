import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Dashboard from "./pages/Dashboard";
import HighlightedCars from "./pages/HighlightedCars";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar shouldHideOnScroll className="bg-white/15">
        <NavbarBrand>
          <p className=" font-bold">Car Analytics</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <a href={`/`}>Dashboard</a>
          </NavbarItem>
          <NavbarItem isActive>
            <a href={`/highlighted`}>Highlight</a>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
