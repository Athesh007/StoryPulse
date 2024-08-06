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
  //for selected story
  if (req.body.selected_story) {
    const prompt_1 = `Generate two supernatural stories in below format
      Always follow the below format during output
      {
        story1:"One possible continue of the story provided, it should be atleast 7 lines"
        story2:"Another possible continue of the story provided, it should be atleast 7 lines"
      }
      Continue the existing narrative with two new chapters following the story ${req.body.selected_story}, maintaining story itself. Continue from the provided story. Do not give the same story again. The genre is ${req.body.genre}`;

    const result_test = await model.generateContent(prompt_1);
    const test_res = await result_test.response;
    let resp = test_res.text();
    if (resp.startsWith("`")) resp = resp.slice(7, resp.length - 4);
    return res.status(200).json({ server: resp });
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
  let structuredOutputRes = response.text();
  if (structuredOutputRes.startsWith("`"))
    structuredOutputRes = structuredOutputRes.slice(
      7,
      structuredOutputRes.length - 4
    );
  res.status(200).json({ server: structuredOutputRes });
});

app.post("/test", (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "Ok" });
});
app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
