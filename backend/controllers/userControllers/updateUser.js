const asyncHandler = require('express-async-handler');
const User = require('../../models/User');

// Only for updating name and email, followers and password will be separate functions
const updateUser = asyncHandler(async (req, res) => {
  // Check to make sure user exists to update
  const user = await User.findById(req.params.id);
  console.log(body);
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

module.exports = updateUser;
