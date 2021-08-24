import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

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

function ActivityContainer({ type, data }) {
  const message = type == "polls" ? "Polls Authored" : "Responses Submitted";

  const activityListItems = data.map((item, index) => (
    <ActivityListItem key={index} item={item} type={type} />
  ));

  var activityList;
  if (activityListItems.length) {
    activityList = <ol className="activity-list">{activityListItems}</ol>;
  } else {
    activityList = <h2>none!</h2>;
  }
  return (
    <div className="activity-container">
      <div className="activity-header">{message}</div>
      {activityList}
    </div>
  );
}

function ActivityListItem({ item, type }) {
  // type expectations:
  // polls -> item is a Poll object
  // responses -> item is an array [response object, associated poll object]
  const path =
    type == "polls" ? `/polls/${item.id}` : `/responses/${item[0].id}`;
  const text = type == "polls" ? `${item.title}` : `${item[1].title}`;
  return (
    <li>
      <Link to={path}>{text}</Link>
    </li>
  );
}
