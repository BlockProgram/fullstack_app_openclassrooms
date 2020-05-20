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

exports.publishPost = (req, res, next) => {
  let body = JSON.parse(req.body.data);
  console.log(body);
  let post = {
    postId: 0,
    titre: body.titre,
    url:
      body.url ||
      `${req.protocol}://${req.get("host")}/gifs/${req.file.filename}`,
    auteur: body.auteur,
    nbComments: 0,
  };
  let sql = "INSERT INTO Posts SET ?, date = NOW()";
  connection.query(sql, post, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json({ message: "Post créé" });
    }
  });
};

exports.getAllPosts = (req, res, next) => {
  let data;
  let sql =
    "SELECT * FROM Users lEFT JOIN Posts ON Users.userId = Posts.auteur ORDER BY Posts.date DESC";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
      // data = {};
    } else {
      res.status(200).json(results);
      // data = results;
    }
    // return data;
  });
};

exports.getOnePost = (req, res, next) => {
  let sql = `SELECT * FROM Users LEFT JOIN Posts ON Users.userId = Posts.auteur where Posts.postId=${req.url.slice(
    1
  )}`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.createComment = (req, res, next) => {
  let comment = {
    commentId: req.body.id,
    auteur: req.body.auteur,
    contenu: req.body.contenu,
    postId: req.body.postId,
  };
  let sql = "INSERT INTO Comments SET ?, dateAjout = NOW()";
  connection.query(sql, comment, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    }
  });
  let sql2 = `UPDATE Posts SET nbComments=${req.body.nbComments} WHERE postId=${req.body.postId}`;
  connection.query(sql2, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json({ message: "Commentaire enregistré" });
    }
  });
};

exports.getAllComments = (req, res, next) => {
  let postID = req.url.split("/")[1];
  let sql = `SELECT * FROM Comments lEFT JOIN Users ON Users.userId = Comments.auteur WHERE Comments.postId=${postID} ORDER BY Comments.dateAjout DESC`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ message: "An error occured" });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.deleteOnePost = async (req, res, next) => {
  let sql = `DELETE FROM Posts WHERE postId=${req.body.postId}`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ message: "1st query failed" });
    }
  });
  let sql2 = `DELETE FROM Comments WHERE postId=${req.body.postId}`;
  connection.query(sql2, (err, results) => {
    if (err) {
      res.status(400).json({ message: "2nd query failed" });
    } else {
      res.status(200).json({ message: "Post supprimé" });
    }
  });
};

exports.deleteOneComment = async (req, res, next) => {
  let sql = `DELETE FROM Comments WHERE commentId=${req.body.commentId}`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(400).json({ message: "1st query failed" });
    }
  });
  let sql2 = `UPDATE Posts SET nbComments=${req.body.nbComments} WHERE postId=${req.body.postId}`;
  connection.query(sql2, (err, results) => {
    if (err) {
      res.status(400).json({ message: "2nd query failed" });
    } else {
      res.status(200).json({ message: "Commentaire supprimé" });
    }
  });
};
