const User = require('../../models/User');

const followUser = async (req, res) => {
  try {
    //user
    const user = await User.findById(req.params.id);
    //current user
    const currentUser = await User.findById(req.body.id);

    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({
        $push: { followers: req.body.id },
      });

      await currentUser.updateOne({ $push: { following: req.params.id } });
    } else {
      res.status(403).json('you already follow this user');
    }
    res.status(200).json('following the user');
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
};

module.exports = followUser;
