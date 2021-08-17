import React from "react";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";

class Header extends React.Component {
  render() {
    return (
      <header className="main-nav flex-container-row">
        <LeftNav />
        <RightNav />
      </header>
    );
  }
}

export default Header;
