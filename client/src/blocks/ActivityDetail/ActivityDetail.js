import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { mdiSack } from "@mdi/js";
import { useContext } from "react";
import { UserContext } from "../User/UserContext";
import { ActivityDetailContext } from "./ActivityDetailContext";
import "./ActivityDetail.css";
import Icon from "@mdi/react";
import { mdiTimerSand } from "@mdi/js";
import { mdiChevronDoubleLeft } from "@mdi/js";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useNavigate } from "react-router-dom";
import { mdiCircleEditOutline } from "@mdi/js";
import { mdiDeleteVariant } from "@mdi/js";
import { ActivityListContext } from "../ActivityList/ActivityListContext";
import { useState } from "react";
import { useEffect } from "react";
function ActivityDetail() {
  const { activity, handleDelete, handleUpdate } = useContext(
    ActivityDetailContext
  );
  const { activityList, handlerMap } = useContext(ActivityListContext);
  const { addExp, loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [claim, showClaim] = useState(false);

  useEffect(() => {
    if (activity && activity.achieved && !claim) {
      showClaim(true);
    }
  }, [activity, claim]); // Add claim as a dependency

  if (!activity) {
    return (
      <Container className="text-center">
        <div>Loading...</div>;
      </Container>
    );
  }

  const onClickClaim = async () => {
    if (activity.claimed === false) {
      addExp(loggedInUser.id, activity.timeGoal);
      console.log("you claimed this bounty");
      handleUpdate(true);
    } else {
      alert("you already claimed this bounty");
    }
  }; // have to change the activity status from achieved to claimed ezs

  const onClickDelete = async () => {
    try {
      navigate("/activity");
      await handleDelete(); // Call the handleDelete function
      // Navigate back after successful deletion
      console.log(activityList); // Force handleLoad function from ActivityListProvider
      await handlerMap.handleLoad();
      console.log("LOLOLOLOLOLOLOLOLOLOLOL");
    } catch (error) {
      console.error("Error deleting activity:", error);
      // Handle error as needed
    }
  };
  const onClickTimer = () => {
    navigate("/stopwatch?id=" + activity.id);
  };

  return (
    <Container>
      <Row>
        <Col xs sm md={2}></Col>
        <Col xs={12} sm={12} md={8} className="text-center">
          <button className="Back" onClick={() => navigate(-1)}>
            <Icon path={mdiChevronDoubleLeft} size={1.5} />
          </button>
          <h1 className="Name" style={{ whiteSpace: "nowrap" }}>
            {activity.name}
          </h1>
          <div className="Quote">"{activity.quote}"</div>
          <div>
            <ProgressBar
              animated
              now={activity.completionRate}
              variant="warning"
            />
            {activity.completionRate} %
          </div>
        </Col>
        <Col xs sm md={2}></Col>
      </Row>

      <Row>
        <Col xs sm md={3}></Col>
        <Col xs={12} sm={5} md={3} className="text-center">
          <div className="ToDo">
            Completed
            <br />
            {activity.spentTime.toFixed(2)}/{activity.timeGoal}H
          </div>
        </Col>

        <Col xs={12} sm={5} md={3} className="text-center">
          <div className="ToDo">
            Remaining
            <br />
            {activity.remaining.toFixed(2)}H
          </div>
        </Col>
        <Col xs sm md={3}></Col>
      </Row>
      <Row>
        <Col xs sm={3} md={4} className="text-center">
          <button className="but" onClick={onClickDelete}>
            <Icon className="Icon" path={mdiDeleteVariant} size={2}></Icon>
          </button>
        </Col>
        <Col xs sm={3} md={4} className="text-center">
          <button className="but" onClick={onClickTimer}>
            <Icon className="Icon" path={mdiTimerSand} size={2}></Icon>
          </button>
        </Col>
        <Col xs sm={3} md={4} className="text-center">
          <button className="but">
            <Icon className="Icon" path={mdiCircleEditOutline} size={2}></Icon>
          </button>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} className="text-center">
          {claim && (
            <button className="but" onClick={onClickClaim}>
              <Icon
                className="Icon"
                path={mdiSack}
                size={3}
                color={"yellow"}
              ></Icon>
            </button>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ActivityDetail;
