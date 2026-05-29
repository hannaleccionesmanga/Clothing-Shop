const express = require('express');
const router = express.Router();
const { getDashboardSummary } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Admin and Cashier can view dashboard summary
router.get('/summary', protect, authorize('admin', 'cashier'), getDashboardSummary);

module.exports = router;
