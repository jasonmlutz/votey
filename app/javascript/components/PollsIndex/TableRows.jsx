import React from "react";
import PollRow from "./PollRow";
import PropTypes from "prop-types";

export default function TableRows({ keys, data }) {
  return data.map((data, index) => (
    <tr key={index}>
      <PollRow keys={keys} data={data} />
    </tr>
  ));
}

TableRows.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
};
