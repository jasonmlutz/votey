import React from "react";
import { useParams } from "react-router-dom"
import PollDisplay from "./PollDisplay"
import { DATA } from "./PollTestData"

// const { poll_id } = useParams();

export default function Poll() {
  let { poll_id } = useParams();

  return <PollDisplay poll_id = {poll_id} data = {DATA} />
}
