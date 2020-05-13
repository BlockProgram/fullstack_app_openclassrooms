const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const generatedToken = require("crypto").randomBytes(64).toString("hex");
  const decodedToken = jwt.verify(token, generatedToken, (err) => {
    if (err) return res.sendStatus(403);
  });
  next();
};
