const pool = require('../config/db');

const getSalesReport = async (req, res) => {
    try {
        const { type } = req.query; // 'daily', 'monthly'
        
        let query;
        if (type === 'monthly') {
            query = `
                SELECT TO_CHAR(created_at, 'YYYY-MM') as period, SUM(total) as total_sales, COUNT(*) as total_orders
                FROM orders
                WHERE status = 'Paid'
                GROUP BY period
                ORDER BY period DESC
            `;
        } else {
            // Default to daily
            query = `
                SELECT TO_CHAR(created_at, 'YYYY-MM-DD') as period, SUM(total) as total_sales, COUNT(*) as total_orders
                FROM orders
                WHERE status = 'Paid'
                GROUP BY period
                ORDER BY period DESC
            `;
        }

        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching sales report' });
    }
};

const getInventoryReport = async (req, res) => {
    try {
        const query = `
            SELECT p.product_name, p.stock, c.category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            ORDER BY p.stock ASC
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching inventory report' });
    }
};

const getBestSellingProducts = async (req, res) => {
    try {
        const query = `
            SELECT p.product_name, SUM(oi.quantity) as total_sold
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            JOIN orders o ON oi.order_id = o.id
            WHERE o.status = 'Paid'
            GROUP BY p.product_name
            ORDER BY total_sold DESC
            LIMIT 10
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching best selling products' });
    }
};

module.exports = {
    getSalesReport,
    getInventoryReport,
    getBestSellingProducts
};
