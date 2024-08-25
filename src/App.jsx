import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import React from "react";
import Dashboard from "./pages/Dashboard";
import HighlightedCars from "./pages/HighlightedCars";
import { Outlet } from "react-router-dom";

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Dashboard", "Highlight"];

  return (
    <>
      <Navbar shouldHideOnScroll className="bg-white/15">
        <NavbarBrand>
          <p className=" font-bold">Car Analytics</p>
        </NavbarBrand>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <a href={`/`}>Dashboard</a>
          </NavbarItem>
          <NavbarItem isActive>
            <a href={`/highlighted`}>Highlight</a>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem>
            <Link className="text-black w-full" href={`/`} size="lg">
              Dashboard
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="text-black w-full" href={`/highlighted`} size="lg">
              Highlight
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
