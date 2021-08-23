import React, { useContext } from "react";
import Users from "./UserIndex/Users";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Home() {
  const { currentUser } = useContext(CurrentUserContext);
  const isAdmin = currentUser && currentUser.admin;
  return <Users isAdmin={isAdmin} />;
}
