import React from "react";

import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="hero-image">
      <div className="hero-text">
        <h1> Welcome 👋</h1>
        <p>
          {" "}
          Using this tool we can analyze any job desciption to extract important
          skills and keywords{" "}
        </p>
        <Link to="/quiz">
          <button className="btn btn-primary">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
