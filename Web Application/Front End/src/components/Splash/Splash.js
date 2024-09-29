import React from "react";
import "./Splash.css";

const Splash = () => {
  return (
    <div className="splash-screen d-flex justify-content-center align-items-center">
      <div className="text-center">
        <img src="" alt="Splash Screen" className="splash-image mb-4" />
        <h1 className="display-4">Welcome to My App</h1>
        <p className="lead">Loading...</p>
        <button className="btn btn-primary mt-3">Get Started</button>
      </div>
    </div>
  );
};

export default Splash;
