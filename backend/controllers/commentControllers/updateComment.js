const asyncHandler = require('express-async-handler');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { body } = req.body;

  // Check to make sure comment exists
  const comment = await Comment.findById(commentId).populate('user');

  if (!comment) {
    res.status(400);
    throw new Error('Comment not found');
  }
  // Update comment body with body from req.body
  comment.body = body;
  comment.save();

  res.status(200).json(comment);
});

module.exports = updateComment;
