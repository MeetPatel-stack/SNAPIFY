const express = require("express");

const router = express.Router();

const {
  getUserProfile,
  updateProfile,
  toggleFollowUser,
  searchUsers,
  getFollowers,
  getFollowing,
  
  getSavedPosts,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
router.get("/search", protect, searchUsers);
router.get("/:id/followers", protect, getFollowers);

router.get("/:id/following", protect, getFollowing);


router.get("/saved-posts", protect, getSavedPosts);
router.get("/:id", protect, getUserProfile);

router.put("/profile", protect, updateProfile);

router.put("/:id/follow", protect, toggleFollowUser);

module.exports = router;
