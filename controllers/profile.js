const bcrypt = require("bcrypt");
const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "openclass",
  password: "randompass6",
  database: "projet7",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

exports.getProfile = (req, res, next) => {
  let sql = `SELECT * FROM Users where userId =${req.body.userId}`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.modifyProfile = async (req, res, next) => {
  var password = req.body.password;
  var encryptedPassword = await bcrypt.hash(password, 10);
  let sql = `UPDATE Users SET prenom='${req.body.first__name}', nom='${req.body.last__name}',
   email='${req.body.email}', departement='${req.body.department}', mdp='${encryptedPassword}' WHERE userId=${req.body.userId}`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json({ message: "Profil mis à jour" });
    }
  });
};

exports.deleteProfile = async (req, res, next) => {
  let sql = `DELETE FROM Users WHERE userId=${req.body.userId}`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json({ message: "Profil supprimé" });
    }
  });
};
