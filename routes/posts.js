const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// 🚩 方法1. 使用 function
router.get("/", async (req, res) => {
  await postController.getAllPosts(req, res);
});

// 🚩 方法2，使用 callback function
router.post("/", postController.createPost);
router.delete("/", postController.deleteAllPosts);
router.delete("/:id", postController.deletePost);
router.patch("/:id", postController.updatePost);

// 🚩 記得要 export router
module.exports = router;
