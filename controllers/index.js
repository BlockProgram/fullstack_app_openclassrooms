exports.index = function (req, res, next) {
  res.render("index", { page: "Accueil" });
};

exports.login = function (req, res, next) {
  res.render("login", { page: "Se connecter" });
};

exports.signup = function (req, res, next) {
  res.render("signup", { page: "S'inscrire" });
};

exports.feed = function (req, res, next) {
  res.render("feed", { page: "Fil d'actualité" });
};

exports.profile = function (req, res, next) {
  res.render("profile", { page: "Profil" });
};

exports.publish = function (req, res, next) {
  res.render("publish", { page: "Publier un GIF" });
};

exports.post = function (req, res, next) {
  res.render("post", { page: "Post" });
};
