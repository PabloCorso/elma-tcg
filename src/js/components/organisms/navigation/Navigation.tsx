import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Paths } from "../../../config";
import "./navigation.css";

const Navigation = () => {
  const location = useLocation();
  const isOnHomePage = location.pathname === Paths.home;
  return (
    <nav className="nav">
      <Link to={Paths.home} className="nav-logo">
        elma-tcg
      </Link>
      {isOnHomePage && (
        <Link to={Paths.newCard} className="nav-new-card">
          Create new +
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
