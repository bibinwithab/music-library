const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    playlistName: {
      type: String,
      required: true,
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
    songs: [
      {
        songId: {
          type: Schema.Types.ObjectId,
          ref: "Song",
        },
        addedDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;
