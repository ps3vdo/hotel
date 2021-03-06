const express = require("express");
const router = require("./routes/index");
const config = require("./config");
const ApiError = require('./middleware/error.middleware')

const app = express();
const PORT = config.APP_PORT || 5000;

app.use(express.json());
app.use("/api", router);

app.use('/', ApiError)

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
