import React from "react";
import TableRows from "./TableRows";
import PropTypes from "prop-types";

export default function PollsTable({ data, keys }) {
  const tableHeader = keys.map((key, index) => <td key={index}>{key}</td>);

  return (
    <table className="polls-table">
      <thead>
        <tr>
          <th colSpan={keys.length}>POLLS TABLE</th>
        </tr>
        <tr>{tableHeader}</tr>
      </thead>
      <tbody>
        <TableRows keys={keys} data={data} />
      </tbody>
    </table>
  );
}

PollsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
};
