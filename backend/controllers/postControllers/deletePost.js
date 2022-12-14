const asyncHandler = require('express-async-handler');
const Post = require('../../models/Post');

const deleteUser = asyncHandler(async (req, res) => {
  // Check to make sure post exists to delete
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  const deletedPost = await Post.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedPost);
});

module.exports = deleteUser;
