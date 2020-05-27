const cookies = require("cookie-parser");

exports.index = function (req, res, next) {
  let isConnected = req.cookies.Token ? true : false;

  res.render("index", { page: "Accueil", isConnected });
};

exports.login = function (req, res, next) {
  let isConnected = req.cookies.Token ? true : false;

  res.render("login", { page: "Se connecter", isConnected });
};

exports.signup = function (req, res, next) {
  let isConnected = req.cookies.Token ? true : false;

  res.render("signup", { page: "S'inscrire", isConnected });
};

exports.feed = function (req, res, next) {
  let isConnected = req.cookies.Token ? true : false;

  if (isConnected === true) {
    res.render("feed", { page: "Fil d'actualité", isConnected });
  } else {
    res.redirect("/");
  }
};

exports.profile = function (req, res, next) {
  let isConnected = req.cookies.Token ? true : false;

  if (isConnected === true) {
    res.render("profile", { page: "Profil", isConnected });
  } else {
    res.redirect("/");
  }
};

exports.publish = function (req, res, next) {
  let isConnected = req.cookies.Token ? true : false;

  if (isConnected === true) {
    res.render("publish", { page: "Publier un GIF", isConnected });
  } else {
    res.redirect("/");
  }
};

exports.post = function (req, res, next) {
  let isConnected = req.cookies.Token ? true : false;

  if (isConnected === true) {
    res.render("post", { page: "Post", isConnected });
  } else {
    res.redirect("/");
  }
};
