const Video = require("../models/Video");
require("dotenv").config();

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getOneVideo = async (req, res) => {
  try {
    const { id: videoId } = req.params;
    const video = await Video.findOne({ _id: videoId });
    if (!video) {
      return res.status(404).json({ msg: `no message with ID: ${videoId}` });
    }
    res.status(200).json({ video });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createNewVideo = async (req, res) => {
  console.log("post");
  try {
    const video = await Video.create({
      aff: req.body.aff,
      neg: req.body.neg,
      description: req.body.description,
      embed: req.body.embed,
      name: req.body.name,
      tags: req.body.tags,
      thumbnail: req.body.thumbnail,
      vidId: req.body.vidId,
    });
    res.status(201).json({ video });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllVideos,
  createNewVideo,
  getOneVideo,
};
