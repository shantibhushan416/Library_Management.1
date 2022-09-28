import React from "react";
import "./NavBar.css";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav } from "reactstrap";

function Navigation() {
  return (
    <div>
      <Navbar className="NavBar">
        <Logo />
        <NavbarBrand className="text-light NavBrand ms-2">
          LIBRARY MANAGEMENT
        </NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <Link to="/" style={{ textDecoration: "none" }} className="text-light">
          Log Out
        </Link>
      </Navbar>
    </div>
  );
}

export default Navigation;
