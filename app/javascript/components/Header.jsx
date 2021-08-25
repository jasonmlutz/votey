import React from "react";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";

class Header extends React.Component {
  render() {
    return (
      <header className="flex-container-row flex-space-between">
        <LeftNav />
        <RightNav />
      </header>
    );
  }
}

export default Header;
