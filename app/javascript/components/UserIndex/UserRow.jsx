import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserDeleteContext } from "./UserDeleteContext";

export function UserRow({ user, keys }) {
  const { setUserDelete } = useContext(UserDeleteContext);
  return keys.map((key, index) => (
    <td key={index}>{userTableDisplay(key, user)}</td>
  ));

  function handleDelete() {
    const url = "/api/v1/users/" + user.id;

    fetch(url, {
      method: "delete",
    })
      .then((data) => {
        if (data.ok) {
          setUserDelete(true);
          return data.json();
        } else {
          throw new Error("server and/or network error");
        }
      })

      .catch((err) => console.error("unknown error", err));
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
      case "delete":
        output = (
          <button className="delete-btn" onClick={handleDelete}>
            X
          </button>
        );
        break;
      default:
        output = user[key];
    }
    return output;
  }
}
