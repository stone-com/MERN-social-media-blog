const asyncHandler = require('express-async-handler');
const Post = require('../../models/Post');

const getPostsForUser = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.params.userId });

  if (!posts) {
    res.status(400);
    throw new Error('No posts found');
  }

  res.status(200).json(posts);
});

module.exports = getPostsForUser;
