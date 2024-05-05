import React, { Component, useState } from "react";
import "./StopWatch.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiChevronDoubleLeft } from "@mdi/js";
export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [mm, setMm] = useState(0);
  const [ss, setSs] = useState(0);
  const [ms, setMs] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  let timerID = 0;

  const clickHandler = () => {
    if (isRunning) {
      // Running => Stop
      clearInterval(timerID);
      const elapsedTime = (mm / 60 + ss / 3600 + ms / 360000).toFixed(2);
      addTime(elapsedTime)
        .then(() => {
          console.log("Time added successfully");
          navigate(-1);
        })
        .catch((error) => {
          console.error("Error adding time:", error);
        });
    } else {
      // Stop => Running
      timerID = setInterval(() => {
        setMs((prevMs) => {
          let newMs = prevMs + 1;
          if (newMs >= 100) {
            setSs((prevSs) => {
              let newSs = prevSs + 1;
              if (newSs >= 60) {
                setMm((prevMm) => prevMm + 1);
                newSs = 0;
              }
              return newSs;
            });
            newMs = 0;
          }
          return newMs;
        });
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  // 1 => 01
  const format = (num) => {
    return (num + "").padStart(2, "0");
  };

  const addTime = async (time) => {
    try {
      const response = await fetch(
        `http://localhost:8000/activity/addTime?id=${new URLSearchParams(
          location.search
        ).get("id")}`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ time: time }),
        },

        console.log(JSON.stringify({ time: time }))
      );
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Container fluid className="text-center">
      <Row>
        <Col xs={12} sm={12} md={12}>
          <button className="Back" onClick={() => navigate(-1)}>
            <Icon path={mdiChevronDoubleLeft} size={1.5} />
          </button>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12}>
          <div className="stop-watch">
            <div>
              -<span>{format(mm)}</span>:<span>{format(ss)}</span>:
              <span>{format(ms)}</span>-
            </div>
            <div className="text-center">
              <button className="control" onClick={clickHandler}>
                {isRunning ? "Stop & Log" : "Focus"}
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
