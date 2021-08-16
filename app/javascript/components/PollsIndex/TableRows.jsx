import React from "react";
import PollRow from "./PollRow"

export default function TableRows({ keys, data }) {
  return (
    data.map((data, index) => (
      <tr key = { index }>
        <PollRow keys = {keys} data = {data} />
      </tr>
    ))
  )
}
