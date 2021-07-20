import React from "react";
import { useParams } from "react-router-dom"
import PollDisplay from "./PollDisplay"

// const { poll_id } = useParams();

export default function Poll() {
  let { poll_id } = useParams();
  return <PollDisplay poll_id = {poll_id} />
}
