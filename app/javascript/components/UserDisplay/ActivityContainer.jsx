import React from "react";
import ActivityListItem from "./ActivityListItem";

export default function ActivityContainer({ type, data }) {
  const message = type == "polls" ? "Polls Authored" : "Responses Submitted";

  const activityListItems = data.map((item, index) => (
    <ActivityListItem key={index} item={item} type={type} />
  ));

  var activityList;
  if (activityListItems.length) {
    activityList = <ol className="activity-list">{activityListItems}</ol>;
  } else {
    activityList = <h2>none!</h2>;
  }
  return (
    <div className="activity-container">
      <div className="activity-header">{message}</div>
      {activityList}
    </div>
  );
}
