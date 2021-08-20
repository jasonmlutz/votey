import React, { useContext } from "react";
import PollsTable from "./PollsTable";
import PollCreateLink from "./PollCreateLink";

import { PollDeleteProvider } from "./PollDeleteContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Polls() {
  var keys = ["title", "description", "author", "responses"];

  const { currentUser } = useContext(CurrentUserContext);
  if (currentUser && currentUser.admin) {
    keys.push("delete");
  }

  return (
    <PollDeleteProvider className="polls-index">
      <PollsTable keys={keys} />
      <PollCreateLink />
    </PollDeleteProvider>
  );
}
