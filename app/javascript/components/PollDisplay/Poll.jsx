import React from "react";
import { useParams } from "react-router-dom"
import PollDisplay from "./PollDisplay"

export default function Poll() {
  const { poll_id } = useParams();

  return <PollDisplay pollID = {poll_id} />
}
