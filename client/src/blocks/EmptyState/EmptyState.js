import React from "react";

import "./EmptyState.css";
import Spartan from "./spartan.png";

import Icon from "@mdi/react";
import { mdiPlusCircle } from "@mdi/js";
import Add from "../Add/Add";
function EmptyState() {
  return (
    <div className="EmptyState">
      <img className="Spartan" src={Spartan} />
      <h4>Apprentice!</h4>
      <p>
        You currently have no activities. Add them by clicking the button below{" "}
        <br />
        and start you journey through Mastery.
      </p>
      <div>
        <Add />
      </div>
    </div>
  );
}

export default EmptyState;
