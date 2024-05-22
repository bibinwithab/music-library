const express = require("express");
const router = express.Router();

router
  .post("/addSong", songController.addSong)
  .delete("/delete/:id", songController.deleteSong)
  .put("/update/:id", songController.updateSong)
  .get("/all", songController.getAllSongs)
  .get("/one/:id", songController.getOneSong)
  .get("/sort", songController.sortSongs)
  .get("/search", songController.searchSong);

module.exports = router;
