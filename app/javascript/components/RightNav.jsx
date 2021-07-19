import React from "react";
import { Link } from "react-router-dom"

class RightNav extends React.Component {
  render () {
    return (
      <nav className='right-nav'>
        <ul>
          <li>
            <Link to="/session/new">Log In</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default RightNav;
