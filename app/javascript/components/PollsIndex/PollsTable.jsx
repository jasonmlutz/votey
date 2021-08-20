import React, { useState, useEffect, useContext } from "react";
import TableRows from "./TableRows";

import { PollDeleteContext } from "./PollDeleteContext";

export default function PollsTable({ keys }) {
  const [data, setData] = useState({ catalog: [], mounted: false });

  const { pollDelete, setPollDelete } = useContext(PollDeleteContext);

  useEffect(() => {
    if (!data.mounted || pollDelete) {
      const url = "/api/v1/polls/";
      fetch(url)
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("network and/or server error");
        })
        .then((catalog) => {
          setData({ catalog: catalog, mounted: true });
          setPollDelete(false);
        })
        .catch((err) => console.error("unknown error ") + err);
    }
  });

  const tableHeader = keys.map((key, index) => <td key={index}>{key}</td>);

  if (data.catalog.length) {
    return (
      <table className="polls-table">
        <thead>
          <tr>
            <th colSpan={keys.length}>POLLS TABLE</th>
          </tr>
          <tr>{tableHeader}</tr>
        </thead>
        <tbody>
          <TableRows keys={keys} data={data.catalog} />
        </tbody>
      </table>
    );
  } else {
    if (data.mounted) {
      return <h2>No poll data to display!</h2>;
    } else {
      return <h2>Loading ...</h2>;
    }
  }
}
