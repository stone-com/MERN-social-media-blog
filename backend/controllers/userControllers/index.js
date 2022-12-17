const registerUser = require('./registerUser');
const getAllUsers = require('./getAllUsers');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');
const getUser = require('./getUser');
const loginUser = require('./loginUser');
const followUser = require('./followUser');
const unfollowUser = require('./unfollowUser');

module.exports = {
  registerUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
  loginUser,
  followUser,
  unfollowUser,
};
