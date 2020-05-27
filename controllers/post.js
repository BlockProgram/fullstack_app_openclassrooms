const mysql = require("mysql");
const jwt = require("jsonwebtoken");

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

exports.publishPost = (req, res, next) => {
  let userId = jwt.verify(req.cookies["Token"], process.env.JWT_PRIVATE_KEY)
    .userId;

  let body = JSON.parse(req.body.data);
  let postId = 0;
  let nbComments = 0;
  let url =
    body.url ||
    `${req.protocol}://${req.get("host")}/gifs/${req.file.filename}`;

  let sql = `CALL publishPost(${postId}, "${body.titre}", "${url}", ${userId}, ${nbComments})`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json({ message: "Post créé" });
    }
  });
};

exports.getAllPosts = (req, res, next) => {
  let sql = "CALL getAllPosts()";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getOnePost = (req, res, next) => {
  let userId = jwt.verify(req.cookies["Token"], process.env.JWT_PRIVATE_KEY)
    .userId;
  let su = req.cookies["su"];
  let postId = req.url.slice(1);
  let sql = `CALL getOnePost(${postId})`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json({ results, userId, su });
    }
  });
};

// Delete a specific post and its comments
exports.deleteOnePost = async (req, res, next) => {
  let sql = `CALL deleteOnePost(${req.body.postId})`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json({ message: "Post supprimé" });
    }
  });
};

// Create a comment and update number of comments of Posts Table
exports.createComment = (req, res, next) => {
  let userId = jwt.verify(req.cookies["Token"], process.env.JWT_PRIVATE_KEY)
    .userId;

  let sql = `CALL createComment(${req.body.commentId}, ${userId}, "${req.body.contenu}", ${req.body.postId}, ${req.body.nbComments})`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json({ message: "Commentaire ajouté" });
    }
  });
};

exports.getAllComments = (req, res, next) => {
  let userId = jwt.verify(req.cookies["Token"], process.env.JWT_PRIVATE_KEY)
    .userId;
  let su = req.cookies["su"];
  let postId = req.url.split("/")[1];
  let sql = `CALL getAllComments(${postId})`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json({ results, userId, su });
    }
  });
};

exports.deleteOneComment = (req, res, next) => {
  let sql = `CALL deleteOneComment(${req.body.commentId}, ${req.body.nbComments}, ${req.body.postId})`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json({ message: "Commentaire ajouté" });
    }
  });
};
