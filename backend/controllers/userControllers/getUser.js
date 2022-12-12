const asyncHandler = require('express-async-handler');
const User = require('../../models/User');

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error('User with that id not found');
  }

  res.status(200).json(user);
});

module.exports = getUser;
