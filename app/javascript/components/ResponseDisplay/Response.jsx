import React from "react";
import { useParams } from "react-router-dom";
import { AnswerProvider } from "./AnswerContext";
import ResponseDisplay from "./ResponseDisplay";

export default function Response() {
  const { response_id } = useParams();

  return (
    <AnswerProvider>
      <ResponseDisplay response_id={response_id} />
    </AnswerProvider>
  );
}
