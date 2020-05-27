require("dotenv").config();
const bcrypt = require("bcrypt");
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

exports.signup = async (req, res, next) => {
  let password = req.body.password;
  let encryptedPassword = await bcrypt.hash(password, 10);
  let userId = 0;
  let su = false;

  let sql = `CALL signup(${userId}, "${req.body.first__name}", "${req.body.last__name}", "${req.body.email}", "${req.body.department}", "${encryptedPassword}", "${su}")`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.status(200).json({ message: "Inscription réussie" });
    }
  });
};

exports.login = async (req, res, next) => {
  let password = req.body.password__login;
  let email = req.body.email__login;
  let sql = `CALL login("${email}")`;
  connection.query(sql, async (err, results) => {
    if (err) {
      res.status(400).json("Une erreur est survenue");
    } else {
      console.log(results[0], "text");
      if (results[0].length > 0) {
        const comparison = await bcrypt.compare(password, results[0][0].mdp);
        if (comparison) {
          const su = results[0][0].su;
          const userId = results[0][0].userId;
          const accessToken = jwt.sign(
            { userId: userId },
            process.env.JWT_PRIVATE_KEY,
            {
              expiresIn: "24h",
            }
          );
          res.cookie("Token", accessToken, {
            httpOnly: true,
            secure: true,
          });
          res.cookie("su", su, {
            httpOnly: true,
            secure: true,
          });
          res.status(200).json({ message: "Connexion établie" });
        } else {
          res.status(204).json({ message: "Mot de passe incorrect" });
        }
      } else {
        res.status(206).json({ message: "Email invalide" });
      }
    }
  });
};

exports.getProfile = (req, res, next) => {
  let userId = jwt.verify(req.cookies["Token"], process.env.JWT_PRIVATE_KEY)
    .userId;

  let sql = `CALL getProfile(${userId})`;
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.modifyProfile = async (req, res, next) => {
  let userId = jwt.verify(req.cookies["Token"], process.env.JWT_PRIVATE_KEY)
    .userId;
  let password = req.body.password;
  let encryptedPassword = await bcrypt.hash(password, 10);

  let sql = `CALL modifyProfile(${userId}, "${req.body.first__name}", "${req.body.last__name}", "${req.body.email}", "${req.body.department}", "${encryptedPassword}")`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json({ message: "Profil mis à jour" });
    }
  });
};

exports.logOutProfile = (req, res, next) => {
  res.cookie("Token", "", {
    maxAge: 86400,
  });
  res.status(200).json({ message: "Utilisateur déconnecté" });
};

exports.deleteProfile = (req, res, next) => {
  let userId = jwt.verify(req.cookies["Token"], process.env.JWT_PRIVATE_KEY)
    .userId;
  let sql = `CALL deleteProfile(${userId})`;

  connection.query(sql, [userId], (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json({ message: "Profil supprimé" });
    }
  });
};
