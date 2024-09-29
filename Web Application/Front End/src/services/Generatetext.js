import axios from "axios";

const sendData = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/generate",
      data
    );
    return response.data;
  } catch (error) {
    console.error("There was an error sending the data!", error);
    throw error;
  }
};

export default sendData;
