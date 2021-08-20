import React from "react";
import PollsTable from "./PollsTable";
import PollCreateLink from "./PollCreateLink";

import { PollDeleteProvider } from "./PollDeleteContext";

export default function Polls() {
  var keys = ["title", "description", "author", "responses"];

  return (
    <PollDeleteProvider className="polls-index">
      <PollsTable keys={keys} />
      <PollCreateLink />
    </PollDeleteProvider>
  );
}
