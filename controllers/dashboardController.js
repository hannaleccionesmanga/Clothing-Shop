const pool = require('../config/db');

const getDashboardSummary = async (req, res) => {
    try {
        // Get total users
        const usersCount = await pool.query('SELECT COUNT(*) FROM users');
        
        // Get total products
        const productsCount = await pool.query('SELECT COUNT(*) FROM products');
        
        // Get total sales (Paid orders)
        const totalSales = await pool.query("SELECT SUM(total) FROM orders WHERE status = 'Paid'");
        
        // Get total pending orders
        const pendingOrders = await pool.query("SELECT COUNT(*) FROM orders WHERE status = 'Pending'");
        
        // Get low stock products (less than 10)
        const lowStockProducts = await pool.query('SELECT COUNT(*) FROM products WHERE stock < 10');

        res.json({
            total_users: parseInt(usersCount.rows[0].count),
            total_products: parseInt(productsCount.rows[0].count),
            total_sales: parseFloat(totalSales.rows[0].sum || 0),
            pending_orders: parseInt(pendingOrders.rows[0].count),
            low_stock_alerts: parseInt(lowStockProducts.rows[0].count),
            timestamp: new Date()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching dashboard summary' });
    }
};

module.exports = {
    getDashboardSummary
};
