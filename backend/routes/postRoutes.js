const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  deletePost,
  toggleLikePost,
  getPostById,
  addComment
} = require("../controllers/postController.js");

const { protect } = require("../middleware/authMiddleware.js");

// Create Post
router.post("/", protect, createPost);

// Feed
router.get("/", protect, getPosts);

//delete

router.delete("/:id", protect, deletePost);

router.put("/:id/like", protect, toggleLikePost);

router.get('/:id', protect, getPostById);

router.post('/:id/comment', protect, addComment);


module.exports = router;
