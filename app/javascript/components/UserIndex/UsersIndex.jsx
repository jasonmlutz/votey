import React, { useState, useEffect, useContext } from "react";
import { UserDeleteContext } from "./UserDeleteContext";
import UserRow from "./UserRow";

export function UsersIndex({ keys }) {
  const [users, setUsers] = useState({ data: {}, mounted: false });
  const { userDelete, setUserDelete } = useContext(UserDeleteContext);

  useEffect(() => {
    const url = "/api/v1/users";
    if (!users.mounted || userDelete) {
      fetch(url)
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("network and/or server error");
        })
        .then((data) => {
          setUserDelete(false);
          setUsers({ data: data, mounted: true });
        })
        .catch((err) => console.error("unknown error: ", err));
    }
  });

  if (users.data.length > 0) {
    const tableHeader = keys.map((key, index) => <td key={index}>{key}</td>);

    const tableRows = users.data.map((user, index) => {
      return (
        <tr key={index}>
          <UserRow user={user} keys={keys} />
        </tr>
      );
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
}
