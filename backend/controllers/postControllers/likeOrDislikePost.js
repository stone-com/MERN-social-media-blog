const asyncHandler = require('express-async-handler');
const Post = require('../../models/Post');

const likeOrDislike = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.id)) {
      await post.updateOne({ $push: { likes: req.body.id } });
      res.status(200).json(post);
    } else {
      await post.updateOne({ $pull: { likes: req.body.id } });
      res.status(200).json(post);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = likeOrDislike;
