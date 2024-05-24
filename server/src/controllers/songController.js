const asyncHandler = require("express-async-handler");
const Song = require("../models/songModel");

/**
 * @ POST /api/songs/addsong
 * @ sample body
 * {
 *  "title": "levitating",
 *  "artist": "Dua Lipa",
 *  "genre": "Pop",
 *  "releaseDate": "2020"
 * }
 */
const addSong = asyncHandler(async (req, res) => {
  try {
    const { title, artist, genre, releaseDate } = req.body;
    const song = new Song({
      title,
      artist,
      genre,
      releaseDate,
    });
    await song.save();
    res.status(201).json({ message: "Song added" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

/**
 * @ DELETE /api/songs/delete/:id
 */
const deleteSong = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Song.findByIdAndDelete(id);
    res.status(201).json({ message: "Song deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

/**
 * @ PUT /api/songs/update/:id
 *
 * @ sample body
 * {
 *  "genre": "Rap"
 * }
 */
const updateSong = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, genre, releaseDate } = req.body;
    await Song.findByIdAndUpdate(id, { title, artist, genre, releaseDate });
    res.status(201).json({ message: "Song updated" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

/**
 * @ GET /api/songs/all/
 * */
const getAllSongs = asyncHandler(async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

/**
 * @ GET /api/songs?sort=releaseDate
 */
const sortSongs = asyncHandler(async (req, res) => {
  const { sort } = req.query;
  let sortBy = {};
  if (sort) sortBy[sort] = 1;

  try {
    const songs = await Song.find().sort(sortBy);
    res.status(200).json(songs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

/**
 * @ GET /api/songs/search?artist=dua%20lipa
 */
const searchSong = asyncHandler(async (req, res) => {
  const { title, artist, genre, album } = req.query;
  let query = {};
  if (title) query.title = { $regex: title, $options: "i" };
  if (artist) query.artist = { $regex: artist, $options: "i" };
  if (genre) query.genre = genre;
  if (album) query.album = { $regex: album, $options: "i" };

  try {
    const songs = await Song.find(query);
    if (songs.length === 0) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json(songs);
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
