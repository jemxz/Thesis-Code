const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());

app.post("/api/generateQuiz", async (req, res) => {
  const { data } = await axios.post(
    "https://integrate.api.nvidia.com/v1",
    req.body
  );
  res.json(data);
});

app.listen(3000, () => console.log("Proxy server running on port 3000"));
