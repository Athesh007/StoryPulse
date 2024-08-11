# **Story Pulse :book:**

Generate captivating stories with just a few clicks! Our Web app leverages the power of the Gemini API to create unique and engaging narratives based on your prompts.

### **Installation**

Please ensure that you have Node.js(22.2.0 or above) installed on your machine.

**Steps to install**

Clone this repository

```
    https://github.com/Athesh007/StoryPulse.git
```

Install required packages

```
    cd frontend
    npm install
    cd.. && cd backend
    npm install
```

Run the Project

```
    node index.js #make sure you are in backend folder
    cd .. && cd frontend
    npm run dev
```

### **Features:**

- Generate stories based on various genres and themes
- Make your choice from the generated stories
- Save and share your favorite stories in a story gallery
- Export your stories as PDF and read it anywhere
- Edit your stories at any time

### **How it works**

Query the LLM for stories. Two stories will be generated. Choose one and continue with the story. You can also edit the story to drive towards your needs with the **Reimagine** feature.
You can conclude the story and it will be stored in the story gallery.

![Project Workflow](https://github.com/Athesh007/StoryPulse/blob/main/Frontend/story-pulse.png)

### **Tech Stack:**

Frontend : React.js

Backend : Node.js with Express

Database : Firebase

LLM : Gemini-1.5-flash

### **Future Improvements**

- [ ] Add Customizable profiles for the users based ont their generated stories.
- [ ] Expand the range of genres supported by the app to cater to diverse user preferences.
- [ ] Explore advanced storytelling techniques like plot twists, character arcs, and world-building to create more complex and engaging narratives.
