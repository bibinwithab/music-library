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
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", rootRoute);
app.use("/api", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/songs", songRoute);
app.use("/api/playlists", playlistRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server up on http://localhost:${PORT}/`);
  dbConfig();
});
