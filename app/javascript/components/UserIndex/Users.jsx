import React from "react";
import { UsersIndex } from "./UsersIndex";
import { UserDeleteProvider } from "./UserDeleteContext";

export default function Users({ isAdmin }) {
  var keys = ["id", "username", "admin"];
  if (isAdmin) keys.push("delete");

  return (
    <UserDeleteProvider>
      <UsersIndex keys={keys} />
    </UserDeleteProvider>
  );
}

Users.defaultProps = {
  isAdmin: false,
};
