// Get dashboard summary data
const getSummary = async (req, res) => {
  try {
    // ✅ You can add real database queries here
    // Example data — replace with your actual DB data
    const summaryData = {
      totalProducts: 120,
      totalOrders: 45,
      totalUsers: 28,
      totalSales: 15600,
      recentOrders: [
        { id: 101, customer: 'John Doe', amount: 250, date: '2026-05-29' },
        { id: 102, customer: 'Jane Smith', amount: 420, date: '2026-05-28' }
      ],
      currentUser: req.user // from authMiddleware
    };

    res.json({
      success: true,
      message: 'Dashboard data loaded',
      data: summaryData
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to load dashboard',
      error: error.message
    });
  }
};

module.exports = { getSummary };