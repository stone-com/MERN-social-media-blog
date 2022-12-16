const asyncHandler = require('express-async-handler');
const User = require('../../models/User');
const Post = require('../../models/Post');

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error('User with that id not found');
  }
  const posts = await Post.find({ user: req.params.id });
  // Return an object with the user data, plus all the posts from that user.
  const response = { ...user._doc, posts };
  res.status(200).json(response);
});

module.exports = getUser;
