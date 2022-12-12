const asyncHandler = require('express-async-handler');
const Post = require('../../models/Post');

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});

  if (!posts) {
    res.status(400);
    throw new Error('No posts found');
  }

  res.status(200).json(posts);
});

module.exports = getAllPosts;
