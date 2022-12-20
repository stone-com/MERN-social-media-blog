const addPost = require('./addPost');
const updatePost = require('./updatePost');
const deletePost = require('./deletePost');
const getAllPosts = require('./getAllPosts');
const getPostsForUser = require('./getPostsForUser');
const likeOrDislike = require('./likeOrDislikePost');

module.exports = {
  addPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostsForUser,
  likeOrDislike,
};
