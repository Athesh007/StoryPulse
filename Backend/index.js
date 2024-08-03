const z = require("zod");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const { GoogleGenerativeAI } = require("@google/generative-ai");
const ChatGoogleGenerativeAI = require("@langchain/google-genai");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(process.env.EXAMPLE_KEY);
  res.send("Hello World!");
});

// Define your model
const model = new ChatGoogleGenerativeAI.ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apikey: process.env.GOOGLE_API_KEY,
});

//test api
app.post("/generate", async (req, res) => {
  console.log("entered");
  const browserSchema = z.object({
    strory: z
      .string()
      .describe(
        "Generate a story with the initital request or follow based on the story that user choose."
      ),
    story1: z
      .string()
      .describe("Follow or create a story1 based on the same given request"),
    story2: z
      .string()
      .describe(
        "Follow or create another story based on the same given request"
      ),
  });

  const llmWithStructuredOutput = model.withStructuredOutput(browserSchema, {
    name: "story",
  });

  const structuredOutputRes = await llmWithStructuredOutput.invoke([
    [
      "system",
      "You will be provided with some input for the first time with a requirement and then you need to create the story or follow with the choices made. Generate a horror, supernatural story based on a man in the middle of a deep jungle.",
    ],

    ["human", "generate a story or if choice available follow up on that"],
  ]);

  console.log(structuredOutputRes);

  const followup = await llmWithStructuredOutput.invoke("I choose story 2");

  console.log(followup);

  res.status(200).json({ server: "data" });
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
