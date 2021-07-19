import React from "react";

class LeftNav extends React.Component {
  render () {
    return (
      <nav className="left-nav flex-container-row">
        <img src="assets/triangle.jpg"
             alt="triangle logo"
             className="logo"
        />
        <nav className="left-nav-links">
          <ul className="flex-container-row">
            <li><a href="/">Home</a></li>
            <li><a href="/">Polls</a></li>
            <li><a href="/">About</a></li>
          </ul>
        </nav>
      </nav>
    )
  }
}

export default LeftNav;
