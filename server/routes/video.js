const express = require("express");
const router = express.Router();

const {
  getAllVideos,
  createNewVideo,
  getOneVideo,
  getOneVideoByQuery,
} = require("../controllers/videos.js");

router.route("/").get(getAllVideos).post(createNewVideo);
router.route("/:id").get(getOneVideo);
router.route("/tag/:tag").get(getOneVideoByQuery);
module.exports = router;
