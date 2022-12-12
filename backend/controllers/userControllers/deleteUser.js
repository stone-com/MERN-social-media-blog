const asyncHandler = require('express-async-handler');
const User = require('../../models/User');

const deleteUser = asyncHandler(async (req, res) => {
  // Check to make sure user exists to delete
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  const deletedUser = await User.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedUser);
});

module.exports = deleteUser;
