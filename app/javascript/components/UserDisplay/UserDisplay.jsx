import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ActivityContainer from "./ActivityContainer";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Users from "../UserIndex/Users";

export default function UserDisplay({ user_id }) {
  const url = `/api/v1/users/${user_id}`;

  const [data, setData] = useState({ catalog: {}, mounted: false });
  const { currentUser } = useContext(CurrentUserContext);

  const isAdmin =
    currentUser && currentUser.admin && currentUser.id === parseInt(user_id);

  var userIndexDisplay = null;

  if (isAdmin) {
    userIndexDisplay = <Users isAdmin={isAdmin} />;
  }

  useEffect(() => {
    if (!data.mounted) {
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
        .catch((err) => console.error("unknown error: " + err));
    }
  });

  if (Object.keys(data.catalog).length) {
    const username = data.catalog.USER.username;
    const polls = data.catalog.POLLS;
    const responses = data.catalog.RESPONSE_DATA;
    return (
      <div className="user-display">
        <div className="user-header">All about {username}!</div>
        <div className="activities-container flex-container-row">
          <ActivityContainer type="polls" data={polls} />
          <ActivityContainer type="responses" data={responses} />
        </div>
        {userIndexDisplay}
      </div>
    );
  } else {
    if (data.mounted) {
      setTimeout(function () {
        window.location.replace("/");
      }, 5000);
      return (
        <div>
          <div>{"Unable to locate user with id = " + user_id}</div>
          Redirecting to <Link to="/">Home</Link> in 5 seconds ...
        </div>
      );
    } else {
      return <h2>Loading ...</h2>;
    }
  }
}
