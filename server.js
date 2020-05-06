require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3004;

const app = express();

app.use(logger("dev"));

// Data Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// MongoDB w/ Heroku
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});


// Routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));

// Listen to server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
