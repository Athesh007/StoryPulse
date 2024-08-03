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
    story1: z
      .string()
      .describe(
        "Follow or create a story1 based on the same given request. The story should be atleast 7 lines"
      ),
    story2: z
      .string()
      .describe(
        "Follow or create another story based on the same given request. The story should be atleast 7 lines"
      ),
    story1_short: z
      .string()
      .describe(
        "Give a short line of the whole story1 for you to understand the next time when i prompt you"
      ),
    story2_short: z
      .string()
      .describe(
        "Give a short line of the whole story2 for you to understand the next time when i prompt you"
      ),
  });

  // const llmWithStructuredOutput = model.withStructuredOutput(browserSchema, {
  //   name: "story",
  // });

  console.log(req.body);
  // if (req.body.data) {
  //   console.log("--------inside story choosing--------");
  //   const resp = await llmWithStructuredOutput.invoke(
  //     `I choose the story ${req.body.data}. The genere is ${req.body.genre}. Continue with it. `
  //   );
  //   console.log(resp);
  //   return res.status(200).json({ server: resp });
  // }

  // const structuredOutputRes = await llmWithStructuredOutput.invoke(
  //   "Generate stories based on horror, supernatural"
  // );
  // console.log(structuredOutputRes);
  res.status(200).json({ server: "structuredOutputRes" });
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
