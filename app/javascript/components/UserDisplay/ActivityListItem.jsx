import React from "react";
import { Link } from "react-router-dom";

export default function ActivityListItem({ item, type }) {
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
