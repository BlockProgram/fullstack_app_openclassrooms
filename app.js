const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookies = require("cookie-parser");
const path = require("path");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const index = require("./routes/index");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//set path for static assets
app.use(express.static(path.join(__dirname, "assets")));

app.use(cookies());
app.use(bodyParser.json());

// Render HTML routes
app.use("/", index);

app.use(helmet());

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
