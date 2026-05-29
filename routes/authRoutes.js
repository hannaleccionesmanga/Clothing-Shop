const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getProfile,
    logout,
    forgotPassword
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.get('/profile', protect, getProfile);

module.exports = router;
