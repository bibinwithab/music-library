const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")

router
  .post("/newPlaylist", authMiddleware, playlistController.createPlaylist)
  .post("/addSongs", authMiddleware, playlistController.addToPlaylist)
  .delete("/removeSong", authMiddleware, playlistController.removeFromPlaylist);

module.exports = router;
