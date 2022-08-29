import React from "react";
import { Link } from "react-router-dom";

import logo from "../logo.png";
function Header() {
  return (
    <header>
    <Link to="/"> 
      <img src={logo} className="logo" alt="logo" />
    </Link>
    </header>
  );
}

export default Header;
