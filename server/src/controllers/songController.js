const asyncHandler = require("express-async-handler");
const Song = require("../models/songModel");
const User = require("../models/userModel");
const Playlist = require("../models/playlistModel");

const addSong = asyncHandler(async (req, res) => {
  try {
    const { title, artist, genre } = req.body;
    const song = new Song({
      title,
      artist,
      genre,
    });
    await song.save();
    res.status(201).json({ message: "Song added" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

const deleteSong = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Song.findByIdAndDelete(id);
    res.json({ message: "Song deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

const updateSong = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, genre } = req.body;
    await Song.findByIdAndUpdate(id, { title, artist, genre });
    res.json({ message: "Song updated" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

const getAllSongs = asyncHandler(async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

const sortSongs = asyncHandler(async (req, res) => {
  try {
    const songs = await Song.find().sort({ title: 1 });
    res.json(songs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

const searchSong = asyncHandler(async (req, res) => {
  try {
    const { title } = req.query;
    const songs = await Song.find({ title });
    res.json(songs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

module.exports = {
  addSong,
  deleteSong,
  updateSong,
  getAllSongs,
  sortSongs,
  searchSong,
};
