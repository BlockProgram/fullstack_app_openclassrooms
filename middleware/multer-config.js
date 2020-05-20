const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./assets/gifs");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_").split(".")[0];
    callback(null, name + Date.now() + ".gif");
  },
});

module.exports = multer({ storage }).single("gif");
