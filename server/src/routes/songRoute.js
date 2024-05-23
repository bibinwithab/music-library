const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");

router
  .post("/addSong", songController.addSong)
  .delete("/delete/:id", songController.deleteSong)
  .put("/update/:id", songController.updateSong)
  .get("/all", songController.getAllSongs)
  .get("/sort", songController.sortSongs)
  .get("/search", songController.searchSong);

module.exports = router;
