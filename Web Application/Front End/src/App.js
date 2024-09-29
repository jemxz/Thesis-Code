import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Students from "./components/Students/Students"; // Corrected the import path to match casing
import Quiz from "./components/Quiz/Quiz"; // Corrected the import path to match casing
import Full from "./components/Full/Full";
import "./App.css";
import "react-multi-date-picker/styles/colors/red.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/full" element={<Full />} />
          <Route path="/students" element={<Students />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
