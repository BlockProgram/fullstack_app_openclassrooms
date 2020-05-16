const express = require("express");
const router = express.Router();

const profileCtlr = require("../controllers/profile");

router.post("/", profileCtlr.getProfile);
router.put("/", profileCtlr.modifyProfile);
router.delete("/", profileCtlr.deleteProfile);

module.exports = router;
