const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")
const playlistController = require("../controllers/playlistController");

router
  .post("/newPlaylist", authMiddleware, playlistController.createPlaylist)
  .post("/addSongs", authMiddleware, playlistController.addToPlaylist)
  .delete("/removeSong", authMiddleware, playlistController.removeFromPlaylist)
  .get("/all", authMiddleware, playlistController.getAllPlaylists)

module.exports = router;
