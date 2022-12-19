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
    await post.populate('user');
    console.log(post);
    res.status(200).json(post);
  } else {
    res.status(400);
    throw new Error('Could not create post');
  }
});

module.exports = addPost;
