const pool = require('../config/db');

const Order = {
    create: async (userId, total, items) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Create order
            const orderQuery = 'INSERT INTO orders (user_id, total, status) VALUES ($1, $2, $3) RETURNING *';
            const orderValues = [userId, total, 'Pending'];
            const orderResult = await client.query(orderQuery, orderValues);
            const orderId = orderResult.rows[0].id;

            // Create order items
            const itemQuery = 'INSERT INTO order_items (order_id, product_id, quantity, subtotal) VALUES ($1, $2, $3, $4)';
            for (const item of items) {
                await client.query(itemQuery, [orderId, item.product_id, item.quantity, item.subtotal]);
                
                // Update stock
                await client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [item.quantity, item.product_id]);
                
                // Log inventory
                await client.query('INSERT INTO inventory_logs (product_id, change_type, quantity, reason) VALUES ($1, $2, $3, $4)', 
                    [item.product_id, 'Stock Out', item.quantity, `Order #${orderId}`]);
            }

            await client.query('COMMIT');
            return orderResult.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    },

    findAll: async () => {
        const query = `
            SELECT o.*, u.fullname as customer_name 
            FROM orders o
            JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC
        `;
        const result = await pool.query(query);
        return result.rows;
    },

    findByUserId: async (userId) => {
        const query = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC';
        const result = await pool.query(query, [userId]);
        return result.rows;
    },

    findById: async (id) => {
        const orderQuery = `
            SELECT o.*, u.fullname as customer_name 
            FROM orders o
            JOIN users u ON o.user_id = u.id
            WHERE o.id = $1
        `;
        const itemQuery = `
            SELECT oi.*, p.product_name 
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = $1
        `;
        
        const orderResult = await pool.query(orderQuery, [id]);
        if (orderResult.rows.length === 0) return null;

        const itemResult = await pool.query(itemQuery, [id]);
        
        return {
            ...orderResult.rows[0],
            items: itemResult.rows
        };
    },

    updateStatus: async (id, status) => {
        const query = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
        const result = await pool.query(query, [status, id]);
        return result.rows[0];
    }
};

module.exports = Order;
