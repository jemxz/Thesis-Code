// api.js

import axios from "axios";

const createSubject = async (subjectData) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/classroom",
      subjectData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating subject:", error);
    throw error;
  }
};

export default createSubject;
