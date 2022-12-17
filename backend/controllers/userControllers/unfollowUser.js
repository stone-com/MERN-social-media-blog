const User = require('../../models/User');

const unfollowUser = async (req, res) => {
  try {
    //user
    const user = await User.findById(req.params.id);
    //current user
    const currentUser = await User.findById(req.body.id);

    if (currentUser.following.includes(req.params.id)) {
      await user.updateOne({
        $pull: { followers: req.body.id },
      });

      await currentUser.updateOne({ $pull: { following: req.params.id } });
    } else {
      res.status(403).json('you are not following this user');
    }
    res.status(200).json('unfollowing the user');
  } catch (err) {
    res.status(400);
    throw new Error('Error');
  }
};

module.exports = unfollowUser;
