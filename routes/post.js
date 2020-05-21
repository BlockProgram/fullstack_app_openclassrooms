const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postCtlr = require("../controllers/post");

router.post("/", multer, postCtlr.publishPost);
router.get("/", auth, postCtlr.getAllPosts);
router.get("/:id", auth, postCtlr.getOnePost);
router.delete("/:id", auth, postCtlr.deleteOnePost);
router.post("/:id/comments", postCtlr.createComment);
router.get("/:id/comments", postCtlr.getAllComments);
router.delete("/:id/comments", postCtlr.deleteOneComment);

module.exports = router;
