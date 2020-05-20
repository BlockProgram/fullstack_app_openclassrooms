const express = require("express");
const router = express.Router();

const userCtlr = require("../controllers/user");

router.post("/signup", userCtlr.signup);
router.post("/login", userCtlr.login);
router.post("/profile", userCtlr.getProfile);
router.put("/profile", userCtlr.modifyProfile);
router.delete("/profile", userCtlr.deleteProfile);

module.exports = router;
