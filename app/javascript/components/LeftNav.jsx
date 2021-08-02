import React from "react";
import { Link } from "react-router-dom"

class LeftNav extends React.Component {
  render () {
    return (
      <nav className="left-nav flex-container-row">
        <img src="assets/triangle.jpg"
             alt="triangle logo"
             className="logo"
        />
        <nav className="left-nav-links">
          <div className="flex-container-row">
            <Link to="/">Home</Link>
            <Link to="/polls">Polls</Link>
            <Link to="/">About</Link>
          </div>
        </nav>
      </nav>
    )
  }
}

export default LeftNav;
