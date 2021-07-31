import React from "react";
import { useParams } from "react-router-dom";
import UserDisplay from "./UserDisplay";

export default function User() {
  const { user_id } = useParams();

  return <UserDisplay user_id = { user_id }/>
}
