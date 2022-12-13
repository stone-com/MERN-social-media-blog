const express = require('express');
const router = express.Router();
const {
  addComment,
  getComments,
  deleteComment
} = require('../controllers/commentControllers');

// Routes for /api/comments
router.post('/:postId', addComment); //Add a comment
router.get('/:postId', getComments); //Get all comments for a post
router.delete('/:postId/:commentId', deleteComment);
module.exports = router;
