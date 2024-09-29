import React, { useState } from "react";
import apiService from "../../services/Generatetext";
import "bootstrap/dist/css/bootstrap.min.css";
import { jsPDF } from "jspdf";
import headerImage from "../../img/logo.png"; // Adjust the path as needed
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { ClipLoader } from "react-spinners";
import "./DataForm.css"; // Optional for additional styling

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DataForm = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [skillsData, setSkillsData] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (jobDescription.trim().length < 50) {
      // Example: Minimum 50 characters
      setError(
        "Please enter a more detailed job description (at least 50 characters)."
      );
      return;
    }

    setLoading(true);

    try {
      const data = { content: jobDescription };
      const response = await apiService(data);
      setSkillsData(response.receivedData.skills);
      setStatistics({
        wordCount: response.receivedData.wordCount,
        sentenceCount: response.receivedData.sentenceCount,
        keywordFrequency: response.receivedData.keywordFrequency,
      });
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to process the job description.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();

    // Load the image
    const img = new Image();
    img.src = headerImage;

    img.onload = () => {
      // Add the image to the PDF
      doc.addImage(img, "PNG", 50, 10, 100, 30); // Adjust the size and position as needed

      // Add the statistics
      let yOffset = 50;
      doc.setFontSize(16);
      doc.text("Job Description Statistics", 10, yOffset);
      yOffset += 10;

      doc.setFontSize(12);
      doc.text(`Word Count: ${statistics.wordCount}`, 10, yOffset);
      yOffset += 10;
      doc.text(`Sentence Count: ${statistics.sentenceCount}`, 10, yOffset);
      yOffset += 10;

      doc.text("Keyword Frequency:", 10, yOffset);
      yOffset += 10;
      for (const [keyword, freq] of Object.entries(
        statistics.keywordFrequency
      )) {
        doc.text(`${keyword}: ${freq}`, 15, yOffset);
        yOffset += 10;
      }

      // Add the skills
      doc.text("Key Skills and Rankings:", 10, yOffset);
      yOffset += 10;
      skillsData.forEach((skill) => {
        doc.text(`${skill.rank}. ${skill.skill}`, 15, yOffset);
        yOffset += 10;
      });

      doc.save("job_description_analysis.pdf");
    };
  };

  // Prepare data for Skills Bar Chart
  const skillsBarData = skillsData
    ? {
        labels: skillsData.map((skill) => skill.skill),
        datasets: [
          {
            label: "Skill Importance",
            data: skillsData.map((skill) => skill.rank),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      }
    : {};

  // Prepare data for Keyword Frequency Pie Chart
  const keywordPieData = statistics
    ? {
        labels: Object.keys(statistics.keywordFrequency),
        datasets: [
          {
            label: "Keyword Frequency",
            data: Object.values(statistics.keywordFrequency),
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }
    : {};

  return (
    <div className="container mt-5" style={{ paddingBottom: "80px" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Job Description Analyzer</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="jobDescription" className="form-label">
                    Job Description
                  </label>
                  <textarea
                    className="form-control"
                    id="jobDescription"
                    rows="6"
                    value={jobDescription}
                    onChange={handleChange}
                    placeholder="Enter the job description here..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Analyze
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Display Loading Spinner */}
      {loading && (
        <div className="row mt-4 justify-content-center">
          <div className="col-md-8 text-center">
            <ClipLoader color="#0d6efd" size={50} />
            <p>Analyzing...</p>
          </div>
        </div>
      )}

      {/* Display Error */}
      {error && (
        <div className="row mt-4 justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </div>
      )}

      {/* Display Skills Data and Charts */}
      {skillsData && statistics && (
        <div className="row mt-4 justify-content-center">
          <div className="col-md-8">
            {/* Skills Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Key Skills</h4>
                <button
                  className="btn btn-light btn-sm"
                  onClick={handleDownload}
                >
                  Download as PDF
                </button>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  {skillsData.map((skill, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {skill.skill}
                      <span className="badge bg-primary rounded-pill">
                        Rank {skill.rank}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Charts Section */}
            <div className="card shadow-sm">
              <div className="card-header bg-info text-white">
                <h4 className="mb-0">Analysis Charts</h4>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <h5>Skill Importance</h5>
                  <Bar
                    data={skillsBarData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        title: {
                          display: true,
                          text: "Key Skills Importance Ranking",
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          reverse: true, // To have rank 1 at the top
                          title: {
                            display: true,
                            text: "Rank",
                          },
                        },
                        x: {
                          title: {
                            display: true,
                            text: "Skills",
                          },
                        },
                      },
                    }}
                  />
                </div>

                <div className="mb-4">
                  <h5>Keyword Frequency</h5>
                  <Pie
                    data={keywordPieData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "right",
                        },
                        title: {
                          display: true,
                          text: "Keyword Frequency in Job Description",
                        },
                      },
                    }}
                  />
                </div>

                <div className="mb-4">
                  <h5>Job Description Statistics</h5>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong>Word Count:</strong> {statistics.wordCount}
                    </li>
                    <li className="list-group-item">
                      <strong>Sentence Count:</strong>{" "}
                      {statistics.sentenceCount}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataForm;
