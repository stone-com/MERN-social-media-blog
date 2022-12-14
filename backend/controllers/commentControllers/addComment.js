const asyncHandler = require('express-async-handler');
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');

const addComment = asyncHandler(async (req, res) => {
  const { userId, body } = req.body;
  const { postId } = req.params;
  if (!userId || !body || !postId) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const comment = await Comment.create({
    user: userId,
    post: postId,
    body,
  });

  // Populate the user field so we can return it
  const commentWithUser = await Comment.findOne({ _id: comment._id }).populate(
    'user'
  );

  // if comment created successfully, then add the comment to the corresponding post as well
  if (comment) {
    const post = await Post.findById(postId);
    if (post) {
      post.comments.push(comment.id);
      post.save();
      res.status(200).json(commentWithUser);
    } else {
      throw new Error('Could not find post to add comment to');
    }
  } else {
    res.status(400);
    throw new Error('Could not create Comment');
  }
});

module.exports = addComment;
