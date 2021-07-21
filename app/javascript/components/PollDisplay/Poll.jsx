import React from "react";
import { useParams } from "react-router-dom"
import PollDisplay from "./PollDisplay"
import { DATA } from "./PollTestData"

// const { poll_id } = useParams();

// function fetchPoll(poll_id) {
//   const url = `api/v1/polls/${poll_id}`
//   fetch(url)
//     .then((data) => {
//       if (data.ok) {
//         return data.json()
//       }
//       throw new Error("network/server error: Data not ok")
//     })
//     .then()
// }

export default function Poll() {
  const { poll_id } = useParams();
  // const data = fetchPoll(poll_id)

  return <PollDisplay poll_id = {poll_id} />
  // return <PollDisplay poll_id = {poll_id} data = {data} />
  // return (
  //   <div className = "poll-header">
  //     <h2>testing Poll functional component</h2>
  //     <h2>testing fetchPoll function</h2>
  //     <h2>poll_id = {poll_id}</h2>
  //   </div>
  // )
}
