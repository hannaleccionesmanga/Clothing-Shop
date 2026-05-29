const express = require('express');
const router = express.Router();
const authoMiddleware = require('../middleware/authoMiddleware')
const { getDashboardSummary } = require('../controllers/dashboardController');
const dashboardController = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Admin and Cashier can view dashboard summary
router.get('/summary', authoMiddleware, dashboardController. getDashboardSummary);

module.exports = router;
