const asyncHandler = require('express-async-handler');
const User = require('../../models/User');

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (!users) {
    res.status(400).json({ message: 'No users found' });
    return;
  }

  res.status(200).json(users);
});

module.exports = getAllUsers;
