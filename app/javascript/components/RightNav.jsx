import React from "react";

class RightNav extends React.Component {
  render () {
    return (
      <nav className='right-nav'>
        <ul>
          <li>
            <a href="/session/new">Log In</a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default RightNav;
