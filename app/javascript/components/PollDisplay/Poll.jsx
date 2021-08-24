import React from "react";
import { useParams } from "react-router-dom";
import PollDisplay from "./PollDisplay";
import { RadioInputProvider } from "./PollDisplayContexts";

export default function Poll() {
  const { poll_id } = useParams();

  return (
    <RadioInputProvider>
      <PollDisplay pollID={poll_id} />
    </RadioInputProvider>
  );
}
