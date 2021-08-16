import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import PollsTable from "./PollsTable"
import PollCreateLink from "./PollCreateLink"

export default function Polls(props) {
  const keys = ["title", "description", "author", "responses"]

  const [data, setData] = useState([]);
  const [mounted, setMountStatus] = useState(false);

  const url = "api/v1/polls/"

  useEffect(() => {
    if (mounted == false) {
      fetch(url)
        .then((data) => {
          if (data.ok) {
            return data.json()
          }
          throw new Error("network and/or server error")
        })
        .then((data) => {
          setData(data);
          setMountStatus(true);
        })
        .catch((err) => console.error("unknown error ") + err)
    }
  })

  if (data.length) {
    return (
      <div className = "polls-index">
        <PollsTable keys = { keys } data = { data } />
        <PollCreateLink />
      </div>
    )
  } else {
    if (mounted) {
      return <h2>No poll data to display!</h2>
    } else {
      return <h2>Loading ...</h2>
    }
  }
}
