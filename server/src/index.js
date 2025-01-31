require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const rootRoute = require("./routes/root");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const songRoute = require("./routes/songRoute");
const playlistRoute = require("./routes/playlistRoute");
const dbConfig = require("./config/dbConfig");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'https://music-lib-client.vercel.app/',
  credentials: true
}));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(logger)

app.use("/", rootRoute);
app.use("/api", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/songs", songRoute);
app.use("/api/playlists", playlistRoute);

app.use(errorHandler);

app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server up on http://localhost:${PORT}/`);
  dbConfig();
});
