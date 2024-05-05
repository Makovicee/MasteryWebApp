import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../User/UserContext";
import rankImg from "./rank.png";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useNavigate } from "react-router-dom";
import { Icon } from "@mdi/react";
import { mdiChevronDoubleLeft } from "@mdi/js";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./MR.css";
function MR() {
  const navigate = useNavigate();
  const { loggedInUser } = useContext(UserContext);
  let lvlUpThreshold = (100 * Math.pow(1.2, loggedInUser.lvl - 1)).toFixed(0);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight * 0.2,
      behavior: "smooth",
    });
  }, []);
  return (
    <Container fluid>
      <Row>
        <Col className="text-center">
          <button className="Back" onClick={() => navigate("/activity")}>
            <Icon path={mdiChevronDoubleLeft} size={1.5} />
          </button>
          <h2 className="Name" style={{ whiteSpace: "nowrap" }}>
            {loggedInUser.name}
          </h2>
          <img src={rankImg} /> <br />
          <div className="Level">Level: {loggedInUser.lvl}</div>
        </Col>
      </Row>

      <Row>
        <Col className="text-center">
          <div className="Honor">
            Current Honor <br />
            {loggedInUser.honor}
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs sm md={3}></Col>
        <Col xs={12} sm={8} md={6} className="text-center">
          <div>
            <ProgressBar
              animated
              now={(loggedInUser.exp / lvlUpThreshold) * 100}
              variant="warning"
            />
            {loggedInUser.exp} / {lvlUpThreshold}
            <br />
            Experience
          </div>
        </Col>
        <Col xs sm md={3}></Col>
      </Row>

      <Row>
        <Col xs sm md={3}></Col>
        <Col xs={12} sm={5} md={3} className="text-center">
          <div className="Act">
            Completed Activities <br />
            {loggedInUser.completed}
          </div>
        </Col>
        <Col xs={12} sm={5} md={3} className="text-center">
          <div className="Act">
            Pending Activities <br />
            {loggedInUser.pending}
          </div>
        </Col>
        <Col xs sm md={3}></Col>
      </Row>
    </Container>
  );
}

export default MR;
