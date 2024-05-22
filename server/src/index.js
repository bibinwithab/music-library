require("dotenv").config();
const express = require("express");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const rootRoute = require("./routes/root");
const dbConfig = require("./config/dbConfig");

const app = express();
const PORT = process.env.PORT;

app.use(logger);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", rootRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server up on http://localhost:${PORT}/`);
  dbConfig();
});
