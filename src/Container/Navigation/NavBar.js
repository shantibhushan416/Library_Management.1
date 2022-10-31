import React from "react";
import "./NavBar.css";
import Logo from "../Logo/Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, NavbarBrand, Nav } from "reactstrap";
import {
  getLocalStorageData,
  localStorageDataClear,
} from "../../utils/utility";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogedIn = !!getLocalStorageData();

  const goHomePage = () => {
    navigate("/");
  };
  const goToAuth = () => {
    navigate("/auth");
  };

  const storageClear = () => {
    localStorageDataClear();
    window.location.reload();
  };

  return (
    <div style={{ position: "fixed", width: "100%" }}>
      <Navbar className="NavBar">
        <Logo clicked={goHomePage} />

        <NavbarBrand className="text-light NavBrand ms-2">
          LIBRARY MANAGEMENT
        </NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        {location.pathname !== "/studentlist" ? (
          <li
            onClick={() => navigate("/studentlist")}
            style={{ listStyle: "none", cursor: "pointer" }}
            className="text-light me-3"
          >
            Students
          </li>
        ) : null}
        {location.pathname !== "/auth" &&
          (isLogedIn ? (
            <>
              <li
                onClick={storageClear}
                style={{ listStyle: "none", cursor: "pointer" }}
                className="text-light"
              >
                Log out
              </li>
            </>
          ) : (
            <li
              onClick={goToAuth}
              style={{ listStyle: "none", cursor: "pointer" }}
              className="text-light"
            >
              Log in
            </li>
          ))}
      </Navbar>
    </div>
  );
}

export default Navigation;
