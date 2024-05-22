const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Playlist = require("../models/playlistModel");

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.save();
    res.json({ message: "User updated" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    await Playlist.deleteMany({ userId: req.user.id });
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "User and associated playlists deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
