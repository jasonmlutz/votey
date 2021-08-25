import React from "react";
import ActivityListItem from "./ActivityListItem";

export default function ActivityContainer({ type, data }) {
  const message = type == "polls" ? "Polls Authored" : "Responses Submitted";

  const activityListItems = data.map((item, index) => (
    <ActivityListItem key={index} item={item} type={type} />
  ));

  var activityList;
  if (activityListItems.length) {
    activityList = <ol className="">{activityListItems}</ol>;
  } else {
    activityList = <h2>none!</h2>;
  }
  return (
    <div className="sub-container">
      <div className="">{message}</div>
      {activityList}
    </div>
  );
}
