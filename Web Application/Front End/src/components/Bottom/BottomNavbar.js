import React from "react";
import "./BottomNavbar.css";
import { Link } from "react-router-dom";
function BottomNavbar() {
  return (
    <div className="bottom-navbar">
      <Link to="/students">
        <button className="btns">Students</button>
      </Link>
      <button className="btns">Generate Report</button>
      <Link to="/quiz">
        <button className="btns">Generate Test</button>
      </Link>
      <button className="btns">User</button>
      {/* Add more buttons or elements */}
    </div>
  );
}

export default BottomNavbar;
