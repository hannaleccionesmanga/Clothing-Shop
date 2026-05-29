const express = require('express');
const router = express.Router();
const {
    getSalesReport,
    getInventoryReport,
    getBestSellingProducts
} = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Admin only reports
router.get('/sales', protect, authorize('admin'), getSalesReport);
router.get('/inventory', protect, authorize('admin'), getInventoryReport);
router.get('/best-sellers', protect, authorize('admin'), getBestSellingProducts);

module.exports = router;
