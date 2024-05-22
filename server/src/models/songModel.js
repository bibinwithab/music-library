const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    album: {
      type: String,
    },
    genre: {
      type: String,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Song = mongoose.models('Song', songSchema)
module.exports = Song