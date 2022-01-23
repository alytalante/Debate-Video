const express = require("express");
const router = express.Router();

const {
  getAllVideos,
  createNewVideo,
  getOneVideo,
  getOneVideoByQuery,
  getByYTID,
} = require("../controllers/videos.js");

router.route("/").get(getAllVideos).post(createNewVideo);
router.route("/:id").get(getOneVideo);
router.route("/tag/:tag").get(getOneVideoByQuery);
router.route("/yt/:id").get(getByYTID);
module.exports = router;
