const express = require("express");
const router = express.Router();

const {
  getAllVideos,
  createNewVideo,
  getOneVideo,
} = require("../controllers/videos.js");

router.route("/").get(getAllVideos).post(createNewVideo);
router.route("/:id").get(getOneVideo);
module.exports = router;
