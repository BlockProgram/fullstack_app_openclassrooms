const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

exports.signup = async (req, res, next) => {
  var password = req.body.password;
  var encryptedPassword = await bcrypt.hash(password, 10);

  var user = {
    id: 0,
    prenom: req.body.first__name,
    nom: req.body.last__name,
    email: req.body.email,
    departement: req.body.department,
    mdp: encryptedPassword,
  };
  let sql = "INSERT INTO Users SET ?";
  connection.query(sql, user, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json({ message: "Inscription réussie" });
    }
  });
};

exports.login = async (req, res, next) => {
  let email = req.body.email__login;
  let password = req.body.password__login;
  let sql = "SELECT * FROM Users WHERE email = ?";
  connection.query(sql, [email], async (err, results) => {
    if (err) {
      res.status(400).json("Une erreur est survenue");
    } else {
      if (results.length > 0) {
        const comparison = await bcrypt.compare(password, results[0].mdp);
        if (comparison) {
          const userId = results[0].id;
          const accessToken = jwt.sign(
            { id: userId },
            "721bc0d71be67084ee54b97e88abaadc11c37115fd7c5e12e8d11d04c2a924ed8b68ff92f19e3089f4311b08ab3c7ae7d6279f9d512437452faa29606504af94",
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({ accessToken, userId });
        } else {
          res.status(204).json("Mot de passe incorrect");
        }
      } else {
        res.status(206).json("Email invalide");
      }
    }
  });
};
