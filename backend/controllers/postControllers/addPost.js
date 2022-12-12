const asyncHandler = require('express-async-handler');
const Post = require('../../models/Post');

const addPost = asyncHandler(async (req, res) => {
  const { user, title, body } = req.body;

  if (!user || !title || !body) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const post = await Post.create({
    user,
    title,
    body,
    comments: [],
  });

  if (post) {
    res.status(200).json({
      message: 'Post created!',
      _id: post._id,
      user: post.user,
      title: post.title,
      body: post.body,
      comments: post.comments,
    });
  } else {
    res.status(400);
    throw new Error('Could not create post');
  }
});

module.exports = addPost;
