const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/userControllers');

// Routes for /api/users
router.post('/', registerUser); //Create a user
router.get('/'); //Get all users
router.put('/:id'); //Update a user
router.get('/:id'); //Get a user
router.delete('/:id'); //Delete a user

module.exports = router;
