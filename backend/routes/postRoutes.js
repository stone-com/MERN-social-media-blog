const express = require('express');
const router = express.Router();
const {
  addPost,
  updatePost,
  deletePost,
  getAllPosts,
} = require('../controllers/postControllers');

// Routes for /api/posts
router.get('/', getAllPosts); //Get all posts
router.post('/', addPost); //Create a new post
router.put('/:id', updatePost); //Update a post
router.delete('/:id', deletePost); //Delete a post

module.exports = router;
