import React from "react";

import "./HostState.css";
import Icon from "@mdi/react";
import { mdiGhost } from "@mdi/js";
function HostState() {
  return (
    <div className="HosteState">
      <Icon path={mdiGhost} size={4} color={"yellow"} />
      <h4>Oops...</h4>
      <p>
        It seems that you are not logged-in. Please log-in by clicking the
        button on the top right and access all functionalities of this app.
      </p>
    </div>
  );
}

export default HostState;
