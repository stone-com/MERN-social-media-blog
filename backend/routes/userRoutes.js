const express = require('express');
const router = express.Router();

const {
  registerUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userControllers');

// Routes for /api/users
router.post('/', registerUser); //Create a user
router.get('/', getAllUsers); //Get all users
router.put('/:id', updateUser); //Update a user
router.get('/:id'); //Get a user
router.delete('/:id', deleteUser); //Delete a user

module.exports = router;
