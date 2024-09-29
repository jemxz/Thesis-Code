import React from "react";
import List from "../List/list"; // Corrected the import path to match casing
import Classes from "../Classes/Classes";
import Calender from "../Calender/Calender";

import "./Full.css";

function Full() {
  return (
    <div className="Full">
      <List />
      <Classes />
      <Calender />
      <button className="btn btn-primary">Submit Selection</button>
    </div>
  );
}

export default Full;
