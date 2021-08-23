import React from "react";
import { UsersIndex } from "./UsersIndex";

export function Users({ isAdmin }) {
  var keys = ["id", "username", "admin"];
  if (isAdmin) keys.push("delete");

  return <UsersIndex keys={keys} />;
}

Users.defaultProps = {
  isAdmin: false,
};
