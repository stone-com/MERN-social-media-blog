const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');

const {
  addPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostsForUser,
  likeOrDislike,
} = require('../controllers/postControllers');

// Routes for /api/posts
// All routes for posts are protected from 'protect' middleware function
router.get('/', getAllPosts); //Get all posts
router.get('/user/:userId', protect, getPostsForUser); //Get all posts from specific user
router.post('/', protect, addPost); //Create a new post
router.put('/:id/like', likeOrDislike); // Like or dislike a post
router.put('/:id', updatePost); //Update a post
router.delete('/:id', protect, deletePost); //Delete a post

module.exports = router;
