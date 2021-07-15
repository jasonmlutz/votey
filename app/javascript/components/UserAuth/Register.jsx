import React from "react";
import UserAuthDisplay from "./UserAuthDisplay"
import Header from "../Header"

export default () => (
  <>
    <Header />
    <UserAuthDisplay auth_type = "register" />
  </>
);
