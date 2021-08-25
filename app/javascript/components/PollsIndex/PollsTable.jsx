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
          setPollDelete(false);
          setData({ catalog: catalog, mounted: true });
        })
        .catch((err) => console.error("unknown error ") + err);
    }
  });

  const tableHeader = keys.map((key, index) => <td key={index}>{key}</td>);

  if (data.catalog.length) {
    return (
      <div className="container container wide">
        <div className="sub-container">
          <div className="title text-center buffer8">Polls Table</div>
        </div>
        <div className="sub-container flex-container-row">
          <table className="buffer8">
            <thead>
              <tr>{tableHeader}</tr>
            </thead>
            <tbody>
              <TableRows keys={keys} data={data.catalog} />
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    if (data.mounted) {
      return <h2>No poll data to display!</h2>;
    } else {
      return <h2>Loading ...</h2>;
    }
  }
}
