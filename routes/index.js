const express = require("express");
const router = express.Router();

const indexCtlr = require("../controllers/index");

/* GET home page. */
router.get("/", indexCtlr.index);

router.get("/login", indexCtlr.login);

router.get("/signup", indexCtlr.signup);

router.get("/feed", indexCtlr.feed);

router.get("/profile", indexCtlr.profile);

router.get("/publish", indexCtlr.publish);

router.get("/post/:id", indexCtlr.post);

module.exports = router;
