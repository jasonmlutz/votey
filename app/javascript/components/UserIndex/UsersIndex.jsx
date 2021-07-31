import React from "react";
import { DATA } from "./UsersFetchData.js";
import { Link } from "react-router-dom";

const data = DATA; // an array of user objects

export function UsersIndex(props) {
  // props = empty?
  // call to-be-written api fetch
  const keys = ["id", "username", "admin"]
  // console.log(data)
  // return(
  //   <h2>data logged!</h2>
  // )
  return (
    <UsersTable keys = { keys } data = { data } />
  )
}

function UsersTable(props) {
  const data = props.data;
  const keys = props.keys;
  // console.log(data, keys)
  // return(
  //   <h2>data logged!</h2>
  // )
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
