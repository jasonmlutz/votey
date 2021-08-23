import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function UsersIndex({ keys }) {
  const [users, setUsers] = useState({ data: {}, mounted: false });

  useEffect(() => {
    const url = "/api/v1/users";
    if (!users.mounted) {
      fetch(url)
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("network and/or server error");
        })
        .then((data) => {
          setUsers({ data: data, mounted: true });
        })
        .catch((err) => console.error("unknown error: ", err));
    }
  });

  if (users.data.length > 0) {
    const tableHeader = keys.map((key, index) => <td key={index}>{key}</td>);

    const tableRows = users.data.map((user, index) => {
      return <tr key={index}>{userRow(user, keys)}</tr>;
    });

    return (
      <table>
        <thead>
          <tr>
            <th colSpan={keys.length}>USERS TABLE</th>
          </tr>
          <tr>{tableHeader}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    );
  } else {
    if (users.mounted) {
      return <h2>No users to display!</h2>;
    } else {
      return <h2>Loading ...</h2>;
    }
  }

  function userRow(user, keys) {
    return keys.map((key, index) => (
      <td key={index}>{userTableDisplay(key, user)}</td>
    ));
  }

  function userTableDisplay(key, user) {
    var output;
    switch (key) {
      case "username":
        var path = `/users/${user.id}`;
        output = <Link to={path}>{user.username}</Link>;
        break;
      case "admin":
        output = user.admin.toString();
        break;
      default:
        output = user[key];
    }
    return output;
  }
}
