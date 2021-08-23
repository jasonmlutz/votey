import React from "react";
import { UsersIndex } from "./UsersIndex";

export function Users() {
  return <UsersIndex keys={["id", "username", "admin"]} />;
}
