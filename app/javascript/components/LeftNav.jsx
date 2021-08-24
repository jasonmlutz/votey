import React from "react";
import { Link } from "react-router-dom";

class LeftNav extends React.Component {
  render() {
    return (
      <nav className="left-nav flex-container-row">
        <img src="/assets/triangle.jpg" alt="triangle logo" className="logo" />
        <nav className="left-nav-links">
          <div className="flex-container-row">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/polls">
              Polls
            </Link>
          </div>
        </nav>
      </nav>
    );
  }
}

export default LeftNav;
