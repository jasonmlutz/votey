import React from "react";
import TableRows from "./TableRows"

export default function PollsTable({ data, keys }) {
  const tableHeader = keys.map((key, index) => (
    <td key = { index }>{ key }</td>
  ))

  return (
    <table>
      <thead>
        <tr>
          <th colSpan = { keys.length }>POLLS TABLE</th>
        </tr>
        <tr>
          { tableHeader }
        </tr>
      </thead>
      <tbody>
        <TableRows keys = { keys } data = { data }/>
      </tbody>
    </table>
  )
}
