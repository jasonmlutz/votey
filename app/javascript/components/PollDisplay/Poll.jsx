import React from "react";
import { useParams } from "react-router-dom"
import PollDisplay from "./PollDisplay"
import { DATA } from "./PollTestData"

export default function Poll() {
  const { poll_id } = useParams();

  return <PollDisplay poll_id = {poll_id} />
}
