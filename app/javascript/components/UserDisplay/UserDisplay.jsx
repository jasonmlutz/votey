import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserDisplay({ user_id }) {
  const url = `/api/v1/users/${user_id}`;

  const [data, setData] = useState({ catalog: {}, mounted: false });

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
    return (
      <div className="user-display">
        <UserHeader username={data.catalog.USER.username} />
        <Activities
          polls={data.catalog.POLLS}
          responses={data.catalog.RESPONSE_DATA}
        />
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

function UserHeader({ username }) {
  return <div className="user-header">All about {username}!</div>;
}

function Activities({ polls, responses }) {
  return (
    <>
      <ActivityContainer type="polls" data={polls} />
      <ActivityContainer type="responses" data={responses} />
    </>
  );
}

function ActivityContainer({ type, data }) {
  return (
    <div className="activity-container">
      <ActivityHeader type={type} />
      <ActivityList type={type} data={data} />
    </div>
  );
}

function ActivityHeader({ type }) {
  const message = type == "polls" ? "Polls Authored" : "Responses Submitted";
  return <div className="activity-header">{message}</div>;
}

function ActivityList({ type, data }) {
  const activityListItems = data.map((item, index) => (
    <ActivityListItem key={index} item={item} type={type} />
  ));

  if (activityListItems.length) {
    return <ol className="activity-list">{activityListItems}</ol>;
  } else {
    return <h2>none!</h2>;
  }
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
