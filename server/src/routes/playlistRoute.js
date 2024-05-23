const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")
const playlistController = require("../controllers/playlistController");

// create route for all playlist
// create route for all songs in playlist 
router
  .post("/newPlaylist", authMiddleware, playlistController.createPlaylist)
  .post("/addSongs", authMiddleware, playlistController.addToPlaylist)
  .delete("/removeSong", authMiddleware, playlistController.removeFromPlaylist);

module.exports = router;
