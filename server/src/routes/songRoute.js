const express = require("express");
const router = express.Router();

router
  .post("/addSong", songController.addSong)
  .delete("/delete/:id", songController.deleteSong)
  .put("/update/:id", songController.updateSong)
  .get("/all", songController.getAllSongs)
  .get("/one/:id", songController.getOneSong)
  .post("/organize", songController.organizeSongs)
  .get("/search", songController.searchSong);

module.exports = router;
