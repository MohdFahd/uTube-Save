const express = require("express");
const cors = require("cors"); // Import cors
const app = express();

app.use(cors()); // Enable CORS for all routes

app.get("/", (req, res) => {
  //   return res.status(200).send("Hello Mohammed");
  return res.status(200).json({ data: "Hello mohammed" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
