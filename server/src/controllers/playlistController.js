const asyncHandler = require("express-async-handler");
const Playlist = require("../models/playlistModel");
const Song = require("../models/songModel");

/**
 * @ POST /api/playlists/newPlaylist/
 *
 * @ sample body
 * {
 *  "playlistName" : "good vibes"
 * }
 */
const createPlaylist = asyncHandler(async (req, res) => {
  try {
    const { playlistName } = req.body;
    const existingPlaylist = await Playlist.findOne({
      playlistName: { $regex: playlistName, $options: "i" },
    });
    if (existingPlaylist) {
      res
        .status(400)
        .json({ message: "A Playlist already exists with the same name" });
    }
    const playlist = new Playlist({
      userId: req.user.id,
      playlistName,
    });
    await playlist.save();
    res.status(201).json({ message: "Playlist created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

/**
 * @ POST /api/playlists/addSongs
 *
 * @ sample body
 * {
 *  "playlistName": "good vibes",
 *  "songName": "Stars"
 * }
 */
const addToPlaylist = asyncHandler(async (req, res) => {
  try {
    const { playlistName, songName } = req.body;

    const playlist = await Playlist.findOne({
      playlistName: { $regex: playlistName, $options: "i" },
    });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    const song = await Song.findOne({
      title: { $regex: songName, $options: "i" },
    });
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    playlist.songs.push({ songId: song._id });
    await playlist.save();
    res.status(200).json({ message: "Song added to playlist" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: `${error}` });
  }
});

/**
 * @ DELETE /api/playlists/removeSong
 *
 * @ sample body
 * {
 *  "playlistName": "good vibes",
 *  "songName": "levitating",
 * }
 */
const removeFromPlaylist = asyncHandler(async (req, res) => {
  try {
    const { playlistName, songName } = req.body;
    const playlist = await Playlist.findOne({
      playlistName: { $regex: playlistName, $options: "i" },
    });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    const song = await Song.findOne({
      title: { $regex: songName, $options: "i" },
    });
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    playlist.songs = playlist.songs.filter(
      (songItem) => songItem.songId.toString() !== song._id.toString()
    );
    await playlist.save();
    res.json({ message: "Song removed from playlist" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: `${error}` });
  }
});

/**
 * @ GET /api/playlists/all
 */
const getAllPlaylists = asyncHandler(async (req, res) => {
  try {
    // console.log('from all');
    const playlists = await Playlist.find({ userId: req.user.id });
    if (playlists.length == 0) {
      return res.status(404).json({ message: "No playlists found" });
    }
    res.json(playlists);
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: `${error}`,
    });
  }
});

module.exports = {
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  getAllPlaylists,
};
