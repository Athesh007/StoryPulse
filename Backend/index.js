const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(process.env.EXAMPLE_KEY);
  res.send("Hello World!");
});

//test api
app.post("/data-get", (req, res) => {
  const data = {
    story1:
      "A man is alone in the heart of an impenetrable jungle. The canopy is so thick that even the moon's light struggles to pierce through, casting eerie shadows that dance and distort in the undergrowth. His supplies are dwindling, and a growing sense of paranoia gnaws at him. Strange noises echo through the dense foliage, and as night descends, a blood-curdling scream shatters the silence. Fear, hunger, and the unknown conspire to push him to the brink of sanity.",
    story1_short_form:
      "Lost and alone in the jungle, paranoia and terror creep in.",
    story2:
      "An experienced survivalist, Daniel, ventures into the heart of the Amazon rainforest. Armed with state-of-the-art equipment and years of training, he's prepared for the challenges that lie ahead. However, as he delves deeper, he encounters unexplainable phenomena. Ancient, whispered legends of the jungle begin to haunt his dreams. A creature, unseen but felt, stalks him through the undergrowth. His scientific mind clashes with the growing belief in the supernatural as he fights to survive.",
    story2_short_form:
      "Survivalist encounters the unexplainable in the Amazon.",
  };

  res.status(200).json({ server: data });
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
