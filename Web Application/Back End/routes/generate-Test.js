const OpenAI = require("openai");
const express = require("express");
const router = express.Router();

const openai = new OpenAI({
  apiKey:
    "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",
  baseURL: "https://integrate.api.nvidia.com/v1",
});

// POST /generate

router.post("/generate", async (req, res) => {
  console.log("Generate endpoint hit");
  const { content } = req.body;

  try {
    const data = await extractData(content);
    const responseData = {
      message: "Data received successfully",
      receivedData: data,
    };

    res.status(200).json(responseData);
  } catch (err) {
    console.error("Error generating response:", err);
    res.status(400).json({ message: err.message });
  }
});

// Function to extract key skills, rankings, and additional statistics
async function extractData(jobDescription) {
  const prompt = `
  You are an HR assistant. Analyze the following job description and provide:
  
  1. A list of key skills required, ranked by importance.
  2. The total word count of the job description.
  3. The total number of sentences.
  4. Frequency of specific keywords: "experience", "required", "preferred", "responsible", "skills".
  
  Provide the response **ONLY** in JSON format with the following structure(Do not include anything else):
  
  
  {
    "wordCount": number,
    "sentenceCount": number,
    "keywordFrequency": {
      "experience": number,
      "required": number,
      "preferred": number,
      "responsible": number,
      "skills": number
    },
    "skills": [
      {"skill": "Skill 1", "rank": 1},
      {"skill": "Skill 2", "rank": 2}
    ]
  }
  
  `;

  const completion = await openai.chat.completions.create({
    model: "mistralai/mixtral-8x22b-instruct-v0.1", // Use a suitable model
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.5,
    max_tokens: 500,
  });

  const responseText = completion.choices[0].message.content;
  console.log(responseText);

  // Parse the JSON response
  let parsedResponse;
  try {
    parsedResponse = JSON.parse(responseText);
  } catch (error) {
    throw new Error(
      "Failed to parse OpenAI response. Ensure the response is in valid JSON format."
    );
  }
  console.log(parsedResponse);
  return parsedResponse;
}

module.exports = router;
