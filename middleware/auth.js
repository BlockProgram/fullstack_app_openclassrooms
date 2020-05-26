require("dotenv").config();
const jwt = require("jsonwebtoken");
const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "projectUser",
  password: "random100S",
  database: "projet7",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = (req, res, next) => {
  try {
    const token = req.cookies["Token"];
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const userId = decodedToken.userId;

    let sql = `SELECT * FROM Users WHERE userId=?`;
    connection.query(sql, userId, (err, results) => {
      if (err) {
        res.status(400).json({ message: "An error occured" });
      } else {
        if (results.length > 0) {
          next();
        } else {
          res.status(401).json({ message: "Token invalide" });
        }
      }
    });
  } catch {
    res.status(401).json({ error: new Error("Requête invalide") });
  }
};
