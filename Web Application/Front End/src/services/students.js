import axios from "axios";

const fetchSubjects = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/students");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export default fetchSubjects;
