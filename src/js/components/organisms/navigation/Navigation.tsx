import React from "react";
import { Link } from "react-router-dom";
import { Paths } from "../../../config";
import "./navigation.css";

const Navigation = () => {
  return (
    <nav className="nav">
      <Link to={Paths.home} className="nav-logo">
        elma-tcg
      </Link>
      <Link to={Paths.newCard} className="nav-new-card">
        Create new +
      </Link>
    </nav>
  );
};

export default Navigation;
