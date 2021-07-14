import React from "react";

class LeftNav extends React.Component {
  render () {
    return (
      <nav className="left-nav">
        <img src="assets/triangle.jpg"
             alt="triangle logo"
             width="100"
             className="logo"
        />
        <nav className="left-nav-links">
          <ul>
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
