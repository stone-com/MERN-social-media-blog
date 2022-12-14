const asyncHandler = require('express-async-handler');
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');

const getComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  // find get the post first
  const post = await Post.find({ id: postId });

  if (!post) {
    res.status(400);
    throw new Error('Post not found, cannot get comments');
  }
  const comments = await Comment.find({ post: postId }).populate('user');

  res.status(200).json(comments);
});

module.exports = getComments;
