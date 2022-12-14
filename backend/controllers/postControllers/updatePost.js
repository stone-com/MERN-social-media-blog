const asyncHandler = require('express-async-handler');
const Post = require('../../models/Post');

const updatePost = asyncHandler(async (req, res) => {
  // Check to make sure user exists to update
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedPost);
});

module.exports = updatePost;
