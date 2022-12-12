const express = require('express');
const router = express.Router();


// Routes for /api/users
router.post('/'); //Create a user
router.get('/'); //Get all users
router.put('/:id'); //Update a user
router.get('/:id'); //Get a user
router.delete('/:id'); //Delete a user

module.exports = router;
