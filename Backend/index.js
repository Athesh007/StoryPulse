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
  console.log(req.body);

  const browserSchema = z.object({
    story1: z
      .string()
      .describe(
        "create a story1 based on the given request. The story should be atleast 7 lines"
      ),
    story2: z
      .string()
      .describe(
        "create another story based on the given request. The story should be atleast 7 lines"
      ),
  });

  const browserSchema_tune = z.object({
    story1: z
      .string()
      .describe(
        "follow up with a new story1 from the given input story . The story should be atleast 7 lines"
      ),
    story2: z
      .string()
      .describe(
        "follow up with a new story2 from the given input story . The story should be atleast 7 lines"
      ),
  });

  const llmWithStructuredOutput = model.withStructuredOutput(browserSchema, {
    name: "story",
  });

  const llmWithStructuredOutput_tune = model.withStructuredOutput(
    browserSchema_tune,
    {
      name: "story",
    }
  );

  if (req.body.selected_story) {
    console.log("--------inside story choosing--------");
    const resp = await llmWithStructuredOutput_tune.invoke(
      `I have a story,The input story is ${req.body.selected_story}. Follow this story and create two new stories.`
    );
    console.log(resp);
    return res.status(200).json({ server: "resp" });
  }

  const structuredOutputRes = await llmWithStructuredOutput.invoke(
    `Generate stories based on ${req.body.genre} and the topic on which I need story is ${req.body.userdata}`
  );
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
