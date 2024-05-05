import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ActivityCard.css";
import { useNavigate } from "react-router-dom";

function ActivityCard({ activity }) {
  const navigate = useNavigate();

  function handleClick() {
    console.log(activity.id);
    navigate("/activityDetail?id=" + activity.id);
  }

  return (
    <Container>
      <Row>
        <Col xs sm md={2}></Col>
        <Col xs={12} sm={12} md={8}>
          <div className="AC">
            <button className="AC-button" onClick={handleClick}></button>
            <h2>{activity.name}</h2>
            <p>{activity.quote}</p>
            <p>{Number(activity.completionRate).toFixed(2)} %</p>
          </div>
          <Col xs sm md={2}>
            {" "}
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default ActivityCard;
