const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  aff: { type: String, required: true, default: "Empty" },
  neg: { type: String, required: true, default: "Empty" },
  description: { type: String, required: true, default: "Empty" },
  embed: { type: String, required: true, default: "Empty" },
  name: { type: String, requiredusers: true, default: "Empty" },
  tags: { type: Array, required: true, default: "Empty" },
  thumbnail: { type: String, required: true, default: "Empty" },
  vidId: { type: String, required: true, default: "Empty" },
});

module.exports = mongoose.model("Video", VideoSchema);
