const asyncHandler = require('express-async-handler');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

const deleteComment = asyncHandler(async (req, res) => {
  const { postId, commentId } = req.params;
  // Check to make sure post exists first
  const post = await Post.findById(postId);

  // Check to make sure comment exists
  const comment = await Comment.findById(commentId);

  if (!comment) {
    res.status(400);
    throw new Error('Comment or post not found');
  }

  // Delete the comment from comments collection
  const deletedComment = await Comment.findByIdAndDelete(commentId);

  // Delete the reference to comment from the comments array of the post
  post.comments.pull({ _id: commentId });
  post.save();

  res.status(200).json({ deletedComment });
});

module.exports = deleteComment;
