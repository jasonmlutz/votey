import React from "react";
import { UserDeleteProvider } from "./UserDeleteContext";
import { UsersIndex } from "./UsersIndex";

export function Users({ isAdmin }) {
  var keys = ["id", "username", "admin"];
  if (isAdmin) keys.push("delete");

  return (
    <UserDeleteProvider>
      <UsersIndex keys={keys} />;
    </UserDeleteProvider>
  );
}

Users.defaultProps = {
  isAdmin: false,
};
