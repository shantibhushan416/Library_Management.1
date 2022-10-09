import React from "react";
import "./NavBar.css";
import Logo from "../Logo/Logo";
import { useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, Nav } from "reactstrap";

function Navigation() {
  const navigate = useNavigate();
  const goHomePage = () => {
    navigate("/");
  };
  const goToAuth = () => {
    navigate("/auth");
  };
  return (
    <div>
      <Navbar className="NavBar">
        <Logo clicked={goHomePage} />

        <NavbarBrand className="text-light NavBrand ms-2">
          LIBRARY MANAGEMENT
        </NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        {/* <li
          onClick={goToAuth}
          style={{ listStyle: "none", cursor: "pointer" }}
          className="text-light"
        >
          Log Out
        </li> */}
      </Navbar>
    </div>
  );
}

export default Navigation;
