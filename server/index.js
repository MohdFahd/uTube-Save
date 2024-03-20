const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const fs = require("fs");
const SSE = require("sse");
const http = require("http"); // Import the http module

const app = express();
const server = http.createServer(app); // Create an HTTP server instance

const sse = new SSE(server); // Pass the server instance to SSE

app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

var formats;
var videoLink;
var selectedFormat;
var title;
let choiceFormat;
app.get("/", (req, res) => {
  res.status(200).json({ data: "Hello Mohammed" });
});

app.post("/getData", async (req, res) => {
  const link = req.body.link;
  videoLink = req.body.link;
  choiceFormat = req.body.format;
  console.log("choice", choiceFormat);
  if (choiceFormat != "") {
    return res.redirect(
      "/download?format=" + choiceFormat + "&link=" + videoLink
    );
  }

  let isValidate = ytdl.validateURL(videoLink);
  if (isValidate) {
    try {
      // Get the Video Id using getURLVideoID method
      let videoID = ytdl.getURLVideoID(videoLink);
      // Extract the formats from the video ID and send it as a response
      const { player_response } = await ytdl.getInfo(videoID);
      formats = player_response.streamingData["formats"];
      // map the formats to only qualityLabel and quality
      const formatDetails = formats.map((format) => {
        return {
          qualityLabel: format.qualityLabel,
          contentLength: format.contentLength,
        };
      });
      // .filter((format) => format.qualityLabel === "360p")

      // Extract the vidInfo and send the data into the client
      title = player_response.videoDetails.title;
      const lengthSeconds = player_response.videoDetails.lengthSeconds;
      res.json({
        formats: formatDetails,
        videoDetails: {
          title: title,
          lengthSeconds: lengthSeconds,
          img: player_response.videoDetails.thumbnail.thumbnails[0].url,
        },
      });
      console.log("formats");
    } catch (error) {
      console.error("Error occurred while fetching video details:", error);
      res
        .status(500)
        .json({ message: "Error: Unable to fetch video details." });
    }
  } else {
    res.json({ message: "Error: Invalid video URL" });
  }
});
// Array to store connected SSE clients
const clients = [];

// Function to send download progress to all connected clients
const sendProgress = (progress) => {
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify({ progress })}\n\n`);
  });
};

app.get("/download", async (req, res) => {
  // Get the selected format from the request query parameters
  // selectedFormat = formats.find((format) => {
  //   return format.qualityLabel === choiceFormat;
  // });
  const format = formats[0]; // download the first format in the list

  const videoStream = ytdl(videoLink, { format: selectedFormat });

  // Set response headers
  res.setHeader("Content-Type", "video/mp4");
  res.setHeader("Content-Length", format.contentLength);
  res.setHeader(
    "Content-Range",
    `bytes 0-${format.contentLength - 1}/${format.contentLength}`
  );
  res.setHeader("Accept-Ranges", "bytes");
  const encodedTitle = encodeURIComponent(title);

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${encodedTitle}.mp4"`
  );

  // Calculate chunk size for tracking progress
  const chunkSize = 10 * 1024; // 10 KB

  // Send the video data in chunks
  videoStream.on("data", (chunk) => {
    res.write(chunk); // Send the chunk to the client
    const progress = (res.socket.bytesWritten / format.contentLength) * 100;
    sendProgress(progress); // Update download progress for SSE clients
  });

  // Handle errors
  videoStream.on("error", (error) => {
    console.error("Error:", error.message);
    res.status(500).send("Error downloading video");
  });

  // Handle end of stream
  videoStream.on("end", () => {
    console.log("Video downloaded");
    res.end(); // Finish the response
  });
});

// Endpoint to establish SSE connection
app.get("/progress", (req, res) => {
  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send a welcome message to the client
  res.write("data: Welcome to download progress updates\n\n");

  // Add the client to the list of connected clients
  clients.push(res);

  // Remove the client from the list when the connection is closed
  req.on("close", () => {
    const index = clients.indexOf(res);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
