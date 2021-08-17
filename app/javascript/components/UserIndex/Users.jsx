import React from "react";
import { UsersIndex } from "./UsersIndex";

export function Users(props) {
  return <UsersIndex keys={["id", "username", "admin"]} />;
}
