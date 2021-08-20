import React from "react";
import { Link } from "react-router-dom";

export default function RespondentDisplay({ respondent }) {
  const respondent_id = respondent.id;
  const path = `/users/${respondent_id}`;
  const name = respondent.username;
  return (
    <div className="respondent-display">
      Respondent: <Link to={path}>{name}</Link>
    </div>
  );
}
