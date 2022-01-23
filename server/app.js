const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const connectDB = require("./db/connect");
const videos = require("./routes/video.js");

const port = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 5000000 })
);
app.use("/api/v1/videos", videos);

app.use(
  cors({
    origin: "*",
    methods: "POST",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.options("*", cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`listening on port: ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
