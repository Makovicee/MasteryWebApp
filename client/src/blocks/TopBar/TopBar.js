import React from "react";
import "./TopBar.css";
import Icon from "@mdi/react";

import { useNavigate } from "react-router-dom";

import { useContext, useEffect } from "react";
import { UserContext } from "../../blocks/User/UserContext";

import { mdiShieldCrown } from "@mdi/js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { ActivityListContext } from "../ActivityList/ActivityListContext";
import { useLocation } from "react-router-dom";
import { mdiTreasureChestOutline } from "@mdi/js";
function TopBar() {
  const { userList, loggedInUser, handlerMap } = useContext(UserContext);
  const { activityList } = useContext(ActivityListContext);
  const navigate = useNavigate();
  const filteredActivityList = loggedInUser
    ? activityList.filter((activity) => activity.owner === loggedInUser.id)
    : [];
  const location = useLocation();
  useEffect(() => {
    if (
      loggedInUser &&
      filteredActivityList.length > 0 &&
      location.pathname !== "/activityDetail" &&
      location.pathname !== "/MR"
    ) {
      navigate("/activity");
    } else if (
      loggedInUser &&
      filteredActivityList.length === 0 &&
      location.pathname !== "/MR"
    ) {
      navigate("/empty");
    } else if (!loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser]);

  const handleButtonClick = () => {
    if (loggedInUser) {
      navigate("/MR");
    } else {
      alert(
        "Whats the hurry? First you need to login to view you Mastery Rank"
      );
    }
  };

  return (
    <Container fluid>
      <nav className="TopBar">
        <Row className="align-items-center">
          <Col xs={3} md={1} className="text-center">
            <Icon path={mdiShieldCrown} size={3} color={"yellow"} />
          </Col>
          <Col xs={6} md={2}>
            <h1 className="text-center">Mastery</h1>
          </Col>
          <Col xs={3} md={6} className="text-end">
            <button className="chestButton" onClick={handleButtonClick}>
              {" "}
              <Icon path={mdiTreasureChestOutline} size={2} color={"yellow"} />
            </button>
          </Col>
          <Col xs={12} md className="text-center">
            <Dropdown as={ButtonGroup}>
              <Button
                variant="dark"
                onClick={() => {
                  if (loggedInUser) {
                  }
                }}
              >
                {loggedInUser ? loggedInUser.name : "Log in"}
              </Button>

              <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />

              <Dropdown.Menu>
                {getUserMenuList({ userList, loggedInUser, handlerMap })}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </nav>
    </Container>
  );
}

function getUserMenuList({ userList, loggedInUser, handlerMap }) {
  // temporary solution to enable login/logout
  const userMenuItemList = userList.map((user) => (
    <Dropdown.Item key={user.id} onClick={() => handlerMap.login(user.id)}>
      {user.name}
    </Dropdown.Item>
  ));

  return userMenuItemList;
}

export default TopBar;
