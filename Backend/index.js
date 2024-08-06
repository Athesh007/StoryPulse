const z = require("zod");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
// const ChatGoogleGenerativeAI = require("@langchain/google-genai");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(process.env.EXAMPLE_KEY);
  res.send("Hello World!");
});

// Define your model
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//test api
app.post("/generate", async (req, res) => {
  console.log("entered");
  console.log(req.body, "-- Request Body");

  //for selected story
  if (req.body.selected_story) {
    console.log("--------inside story choosing--------");

    const prompt_1 = `Generate two supernatural stories in below format 
      {
        story1:"The first story with atleast 7 lines",
        story2:"The Second story with atleast 7 lines"
      }
      Continue the existing ${req.body.genre} narrative with two new chapters, maintaining the eerie and atmosphere. The provided story is:${req.body.selected_story}`;

    const result_test = await model.generateContent(prompt_1);
    const test_res = await result_test.response;
    const resp = test_res.text();

    console.log(resp);
    return res.status(200).json({ server: "resp" });
  }

  const prompt = `Generate two supernatural stories in below format 
      {
        story1:"The first story with atleast 7 lines",
        story2:"The Second story with atleast 7 lines"
      }
      genre is: ${req.body.genre} stories.
      Create two original stories with the context ${req.body.userdata}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const structuredOutputRes = response.text();
  console.log(structuredOutputRes);
  res.status(200).json({ server: structuredOutputRes });
});

app.post("/test", (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "Ok" });
});
app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
