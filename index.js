require("dotenv").config();
const express = require("express");
const logger = require("./src/middleware/logger");
const errorHandler = require("./src/middleware/errorHandler");
const rootRoute = require("./src/routes/root");

const app = express();
const PORT = process.env.PORT;

app.use(logger);
app.use(errorHandler);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", rootRoute);

app.listen(PORT, () => {
  console.log(`Server up on http://localhost:${PORT}/`);
});
