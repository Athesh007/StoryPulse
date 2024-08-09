import "dotenv/config";
import cors from "cors";
import express from "express";
import { db } from "./firebase/index.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save-story", async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, "stories"), {
      chat: req.body.data,
    });
    return res.send(docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  res.send("Hello World!");
});

app.get("/get-story", async (req, res) => {
  const querySnapshot = await getDocs(collection(db, "stories"));
  let arr = [];
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
  });
  res.send(arr);
});

//safety-Rules
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

// Define your model
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings,
});

//test api
app.post("/generate", async (req, res) => {
  // for selected story
  if (req.body.selected_story) {
    const prompt_1 = `Generate two stories in below format
      Always follow the below format during output as a markdown format with proper paragraph spacing.
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

  //reimagining the story
  if (req.body.last_chat) {
    const prompt_1 = `Generate story in below format
      Always follow the below format during output without markdown format
      {
        story:"Rewrite the following story section while maintaining the overall plot, character development, and tone of the original story:${req.body.last_chat}.
        Replace the ${req.body.need_change} with the specific part you want to change.
        Include the following elements in the revised section: ${req.body.input}."
      }
      genre is: ${req.body.genre} stories.`;

    const result_test = await model.generateContent(prompt_1);
    const test_res = await result_test.response;
    let resp = test_res.text();
    if (resp.startsWith("`")) resp = resp.slice(7, resp.length - 4);
    return res.status(200).json({ server: resp });
  }

  const prompt = `Generate two stories in below format as a markdown format with proper paragraph spacing.
      {
        story1:"The first story with atleast 7 lines",
        story2:"The Second story with atleast 7 lines"
        title:"Title for the story",
      }
      genre is: ${req.body.genre} stories.
      Create two original stories with the context ${req.body.userdata}
      If the input is something harmful just give {error:"Cannot process"} and nothing else`;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let structuredOutputRes = response.text();
    if (structuredOutputRes.startsWith("`"))
      structuredOutputRes = structuredOutputRes.slice(
        7,
        structuredOutputRes.length - 4
      );
    // console.log(structuredOutputRes);
    const error_check = "Cannot process";
    if (structuredOutputRes.includes(error_check)) {
      throw new Error("harmful");
    }
    res.status(200).json({ server: structuredOutputRes });
  } catch (error) {
    res.status(400).json({ server: "Harmful" });
  }
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
