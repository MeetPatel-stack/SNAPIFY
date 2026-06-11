const User = require("../models/User");
const Post = require("../models/Post"); // for saved posts
// Get User Profile

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Profile

const updateProfile = async (req, res) => {
  try {
    const { bio, profilePic } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.bio = bio || user.bio;
    user.profilePic = profilePic || user.profilePic;

    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const toggleFollowUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    const currentUser = await User.findById(req.user._id);

    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const alreadyFollowing = currentUser.following.includes(targetUser._id);

    if (alreadyFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetUser._id.toString(),
      );

      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== currentUser._id.toString(),
      );
    } else {
      currentUser.following.push(targetUser._id);

      targetUser.followers.push(currentUser._id);
    }

    await currentUser.save();
    await targetUser.save();

    res.json({
      followersCount: targetUser.followers.length,
      followingCount: currentUser.following.length,
      isFollowing: !alreadyFollowing,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const searchUsers = async (req, res) => {
  try {
    const keyword = req.query.search;

    const users = await User.find({
      username: {
        $regex: keyword,
        $options: "i",
      },
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("followers", "username email profilePic");

    res.json(user.followers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("following", "username email profilePic");

    res.json(user.following);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const getSavedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "savedPosts",
        populate: {
          path: "user",
          select: "username profilePic",
        },
      });

    res.json(user.savedPosts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUserProfile,
  updateProfile,
  toggleFollowUser,
  searchUsers,
  getFollowers,
  getFollowing,
  getSavedPosts,
};
