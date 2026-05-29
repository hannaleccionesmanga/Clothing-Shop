// authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  try {
    // Get token from request header
    const token = req.header('x-auth-token');

    // Check if token exists
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized, no token' 
      });
    }

    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request object (so you can use it in controllers)
    req.user = decoded.user;

    // Proceed to the next middleware/controller
    next();

  } catch (error) {
    res.status(401).json({ 
      success: false,
      message: 'Token not valid or expired' 
    });
  }
};

module.exports = authMiddleware;
