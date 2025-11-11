import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/i3.jpg";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Finance Logo" />
        </Link>
      </div>
      <ul className="navbar-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/dashboards">Dashboards</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
