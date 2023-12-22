import React from "react";
import "./style/NavBar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="/logo.png" alt="logo" className="navbar-logo" />
      <div className="navbar-title">RendezView</div>
    </nav>
  );
};

export default Navbar;
