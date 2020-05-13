const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const userRoutes = require("./routes/user");
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

// set path for static assets
app.use(express.static(path.join(__dirname, "assets")));

// Render HTML routes
app.use("/", index);

app.use(bodyParser.json());

app.use("/api/auth", userRoutes);

// SQL EXAMPLES

// // Select single post
// app.get("/getposts/:id", (req, res) => {
//   let sql = `SELECT * FROM Posts WHERE id = ${req.params.id}`;
//   let query = connection.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

module.exports = app;
