const pool = require('../config/db');

const createPayment = async (req, res) => {
    try {
        const { order_id, payment_method, amount, payment_status } = req.body;

        const query = `
            INSERT INTO payments (order_id, payment_method, amount, payment_status)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [order_id, payment_method, amount, payment_status || 'Paid'];
        const result = await pool.query(query, values);

        // If payment is successful, update order status
        if (payment_status === 'Paid' || !payment_status) {
            await pool.query('UPDATE orders SET status = $1 WHERE id = $2', ['Paid', order_id]);
        }

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error processing payment' });
    }
};

const getPayments = async (req, res) => {
    try {
        const query = 'SELECT * FROM payments ORDER BY created_at DESC';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching payments' });
    }
};

module.exports = {
    createPayment,
    getPayments
};
