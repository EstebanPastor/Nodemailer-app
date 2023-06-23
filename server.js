const express = require("express");
const dotenv = require("dotenv").config();
const mainRoute = require("./routes/mainRoute.js");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/v1", mainRoute);

app.listen(PORT, () => {
  console.log("Listening on", PORT);
});
