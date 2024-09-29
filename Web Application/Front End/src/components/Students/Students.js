import React, { useState, useEffect } from "react";
import fetchData from "../../services/students";

const Students = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchDataFromApi() {
      try {
        const apiData = await fetchData();
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchDataFromApi();
  }, []);

  return (
    <div className="container">
      <h2>Students</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Emergency Contact</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.dateOfBirth}</td>
              <td>{student.emergencyContact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
