const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Custom middleware (protect) to only allow authorized users to certain routes.

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if authorizatoion header starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from the header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      // Set to req.user to be able to be used in controllers
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };
