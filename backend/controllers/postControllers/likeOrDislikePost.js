const asyncHandler = require('express-async-handler');
const Post = require('../../models/Post');

const likeOrDislike = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.id)) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $push: { likes: req.body.id } },
        { new: true }
      );
      await updatedPost.populate('user');
      res.status(200).json(updatedPost);
    } else {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $pull: { likes: req.body.id } },
        { new: true }
      );
      await updatedPost.populate('user');
      res.status(200).json(updatedPost);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = likeOrDislike;
