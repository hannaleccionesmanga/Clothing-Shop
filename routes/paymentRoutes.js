const express = require('express');
const router = express.Router();
const { createPayment, getPayments } = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, createPayment);
router.get('/', protect, authorize('admin', 'cashier'), getPayments);

module.exports = router;
