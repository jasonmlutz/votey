import React from "react";
import { useParams } from "react-router-dom";
import ResponseDisplay from "./ResponseDisplay";

export default function Response() {
  const { response_id } = useParams();

  return <ResponseDisplay response_id={response_id} />;
}
