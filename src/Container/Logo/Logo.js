import React from "react";
import logo from "../../assets/logo.png";
import "./Logo.css";

const Logo = (props) => (
  <div className="Logo">
    <img onClick={props.clicked} alt="logo" src={logo} />
  </div>
);

export default Logo;
