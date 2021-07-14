import React from "react";
import Users from "./Users";
import Header from "./Header";

export default () => (
  <div className="main">
  <Header />
    <div className="content">
        <h1>Users registry</h1>
        <Users />
      </div>
    <footer>Author: Jason Lutz</footer>
  </div>
);
