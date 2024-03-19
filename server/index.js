const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();

app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

app.get("/", (req, res) => {
  res.status(200).json({ data: "Hello Mohammed" });
});

app.post("/getData", (req, res) => {
  const link = req.body.link;
  let videoLink = req.body.link;
  let isValidate = ytdl.validateURL(videoLink);
  if (isValidate) {
    res.json({ message: "correct video URL" });
    console.log("yes isValidate");
  } else {
    res.json({ message: "Error: Invalid video URL" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
