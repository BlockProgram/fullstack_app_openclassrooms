const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userCtlr = require("../controllers/user");

router.post("/signup", userCtlr.signup);
router.post("/login", userCtlr.login);
router.post("/profile", auth, userCtlr.getProfile);
router.put("/profile", auth, userCtlr.modifyProfile);
router.delete("/profile/logout", userCtlr.logOutProfile);
router.delete("/profile", auth, userCtlr.deleteProfile);

module.exports = router;
