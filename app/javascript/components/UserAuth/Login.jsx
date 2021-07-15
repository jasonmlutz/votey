import React from "react";
import * from "./UserAuthDisplay"
import Header from "../Header"

export default () => (
  <>
    <Header />
    <UserAuthDisplay auth_type = "login" />
  </>
);
