import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExtractFields from "../../contexts/ExtractFields"

export function UsersIndex(props) {
  // props: none
  const [data, setData] = useState([]);
  const [mounted, setMountStatus] = useState(false);
  const keys = props.keys

  useEffect(() => {
    const url = '/api/v1/users'
    if (mounted == false) {
      fetch(url)
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("network and/or server error")
        })
        .then((data) => {
          const extractedData = ExtractFields(data, keys)
          setData(extractedData);
          setMountStatus(true);
        })
        .catch((err) => console.error("unknown error: " + err));
    }
  })

  if (data.length > 0) {
    return (
      <UsersTable keys = { keys } data = { data } />
    )
  } else {
    if (mounted) {
      return (
        <h2>
          No users to display!
        </h2>
      )
    } else {
      return (
        <h2>
          Loading ...
        </h2>
      )
    }
  }
}

function UsersTable(props) {
  // props: data, keys
  const data = props.data;
  const keys = props.keys;
  return (
    <table>
      <thead>
        <tr>
          <th colSpan = { keys.length }>USERS TABLE</th>
        </tr>
        <tr>
          <TableHeader keys = { keys }/>
        </tr>
      </thead>
      <TableBody keys = { keys } data = { data }/>
    </table>
  )
}

function TableHeader(props) {
  // props: keys
  const keys = props.keys;
  return keys.map((key, index) => (
    <td key = { index }>{ key }</td>
  ))
}

function TableBody(props) {
  // props: keys, data
  const keys = props.keys;
  const data = props.data;
  return (
    <tbody>
      <TableRows keys = { keys } data = { data }/>
    </tbody>
  )
}

function TableRows(props) {
  // props: keys, data
  const keys = props.keys;
  const data = props.data;

  return data.map((user, index) => (
    <tr key = { index }>
      <UserRow keys = { keys } user = { user } />
    </tr>
  ))
}

function UserRow(props) {
  // props: user, keys
  const keys = props.keys;
  const user = props.user;
  return keys.map((key, index) => (
    <td key = { index }>
      {userTableDisplay(key, user)}
    </td>
  ))
}

function userTableDisplay(key, user) {
  var output;
  switch (key) {
    case "username":
      const path = `/users/${user.id}`
      output = <Link to = { path }>{user.username}</Link>
      break;
    case "admin":
      output = user.admin.toString();
      break;
    default:
      output = user[key]
  }
  return output
}
