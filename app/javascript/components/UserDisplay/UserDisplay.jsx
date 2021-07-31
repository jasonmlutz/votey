import React from "react";
import { DATA } from "./UserFetchData"
import { Link } from "react-router-dom";

const data = DATA;

export default function UserDisplay(props) {
  // props: user_id
  // const user_id = props.user_id

  return(
    <div className = "user-display">
      <UserHeader username = { data.USER.username } />
      <Activities
        polls = { data.POLLS}
        responses = { data.RESPONSE_DATA }
      />
    </div>
  )
}

function UserHeader(props) {
  return (
    <div className = "user-header">All about {props.username}!</div>
  )
}

function Activities(props) {
  // props: polls, responses
  return (
    <>
      <ActivityContainer
        type = "polls"
        data = { props.polls }
      />
      <ActivityContainer
        type = "responses"
        data = { props.responses }
      />
    </>
  )
}

function ActivityContainer(props) {
  return (
    <div className = "activity-container">
      <ActivityHeader type = { props.type }/>
      <ActivityList type = { props.type } data = { props.data }/>
    </div>
  )
}

function ActivityHeader(props) {
  const type = props.type;
  const message = (type == "polls" ? "Polls Authored" : "Responses Submitted")
  return (
    <div className = "activity-header">{message}</div>
  )
}

function ActivityList(props) {
  const type = props.type; // "polls" or "responses"
  const data = props.data; // an array of poll or response objects
  // console.log(type, data)
  // return (
  //   <h2>testing ActivityList for type = {type}</h2>
  // )
  const activityListItems = data.map((item, index) =>
    <ActivityListItem key = {index} item = {item} type = {type} />
  );

  return (
    <ol className = "activity-list">
     {activityListItems}
    </ol>
  )
}

function ActivityListItem(props) {
  const item = props.item;
  // type expectations:
  // polls -> item is a Poll object
  // responses -> item is an array [response object, associated poll object]
  const type = props.type;
  const path = (type == "polls" ? `/polls/${item.id}` : `/responses/${item[0].id}`);
  const text = (type == "polls" ? `${item.title}` : `${item[1].title}` );
  return (
    <li>
      <Link to = {path}>{text}</Link>
    </li>
  )
}
