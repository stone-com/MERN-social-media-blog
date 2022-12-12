const express = require('express');
const router = express.Router();
const { addPost, updatePost } = require('../controllers/postControllers');

router.post('/', addPost); //Create a new post
router.put('/:id', updatePost); //Update a post

module.exports = router;
