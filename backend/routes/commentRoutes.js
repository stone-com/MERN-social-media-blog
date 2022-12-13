const express = require('express');
const router = express.Router();
const { addComment, getComments } = require('../controllers/commentControllers');

// Routes for /api/comments
router.post('/:postId', addComment); //Add a comment
router.get('/:postId', getComments); //Get all comments for a post
module.exports = router;
