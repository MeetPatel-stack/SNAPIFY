const express = require("express");

const router = express.Router();

const {
  getUserProfile,
  updateProfile,
  toggleFollowUser,
  searchUsers,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
router.get("/search", protect, searchUsers);

router.get("/:id", protect, getUserProfile);

router.put("/profile", protect, updateProfile);

router.put("/:id/follow", protect, toggleFollowUser);

module.exports = router;
