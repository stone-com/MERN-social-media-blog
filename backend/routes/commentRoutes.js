const express = require('express');
const router = express.Router();
const {
  addComment,
  getComments,
  deleteComment,
  updateComment
} = require('../controllers/commentControllers');

// Routes for /api/comments
router.post('/:postId', addComment); //Add a comment
router.get('/:postId', getComments); //Get all comments for a post
router.put('/:postId/:commentId', updateComment); //Update a comment
router.delete('/:postId/:commentId', deleteComment); //Delete a comment
module.exports = router;
