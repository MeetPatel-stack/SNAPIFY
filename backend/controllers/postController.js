const Post = require("../models/Post");

// Create Post
const createPost = async (req, res) => {
  try {
    const { caption, image } = req.body;

    if (!caption || !image) {
      return res.status(400).json({
        message: "Caption and image are required",
      });
    }

    const post = await Post.create({
      user: req.user._id,
      caption,
      image,
    });

    const populatedPost = await Post.findById(post._id).populate(
      "user",
      "username email",
    );

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Feed
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// controllers/postController.js

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Authorization check
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this post",
      });
    }

    await post.deleteOne();

    res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const toggleLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const userId = req.user._id;

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString(),
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      likesCount: post.likes.length,
      likes: post.likes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getPostById = async (req, res) => {
  try {

    const post = await Post.findById(req.params.id)
      .populate('user', 'username')
      .populate('comments.user', 'username');

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    res.json(post);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addComment = async (req, res) => {
  try {

    const { text } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    post.comments.push({
      user: req.user._id,
      text
    });

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate('comments.user', 'username');

    res.status(201).json(updatedPost);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
  toggleLikePost,
  getPostById,
  addComment
};
