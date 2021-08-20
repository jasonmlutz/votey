import React, { useState, useEffect, useContext } from "react";
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

  const [data, setData] = useState({ catalog: [], mounted: false });

  const url = "/api/v1/polls/";

  useEffect(() => {
    if (data.mounted == false) {
      fetch(url)
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("network and/or server error");
        })
        .then((catalog) => {
          setData({ catalog: catalog, mounted: true });
        })
        .catch((err) => console.error("unknown error ") + err);
    }
  });

  if (data.catalog.length) {
    return (
      <PollDeleteProvider className="polls-index">
        <PollsTable keys={keys} data={data.catalog} />
        <PollCreateLink />
      </PollDeleteProvider>
    );
  } else {
    if (data.mounted) {
      return <h2>No poll data to display!</h2>;
    } else {
      return <h2>Loading ...</h2>;
    }
  }
}
