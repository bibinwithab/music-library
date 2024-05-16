require("dotenv").config();
const express = require("express");
const logger = require("./src/middleware/logger");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();
const PORT = process.env.PORT;

app.use(logger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server up on http://localhost:${PORT}/`);
});