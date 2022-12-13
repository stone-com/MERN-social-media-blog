const express = require('express');
const router = express.Router();
const { addComment } = require('../controllers/commentControllers');

// Routes for /api/comments
router.post('/', addComment); //Add a comment
module.exports = router;
