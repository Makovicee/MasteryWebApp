import React from "react";
import "./ActivityList.css";
import Activity from "../ActivityCard/ActivityCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ActivityListContext } from "./ActivityListContext";
import { UserContext } from "../../blocks/User/UserContext";
import EmptyState from "../EmptyState/EmptyState";
import Add from "../Add/Add";

function ActivityList() {
  const { activityList } = useContext(ActivityListContext);
  const { loggedInUser } = useContext(UserContext);

  const filteredActivityList = loggedInUser
    ? activityList.filter((activity) => activity.owner === loggedInUser.id)
    : [];

  return (
    <div>
      {filteredActivityList.map((activity) => (
        <Activity key={activity.id} activity={activity} />
      ))}
      <Add />
    </div>
  );
}

export default ActivityList;
