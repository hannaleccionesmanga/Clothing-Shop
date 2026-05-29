const pool = require('../config/db');

const Product = {
    create: async (data) => {
        const { product_name, brand, size, color, stock, price, image, category_id } = data;
        const query = `
            INSERT INTO products (product_name, brand, size, color, stock, price, image, category_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const values = [product_name, brand, size, color, stock, price, image, category_id];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    findAll: async (filters = {}) => {
        let query = `
            SELECT p.*, c.category_name 
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE 1=1
        `;
        const values = [];
        let count = 1;

        if (filters.category_id) {
            query += ` AND p.category_id = $${count++}`;
            values.push(filters.category_id);
        }

        if (filters.search) {
            query += ` AND (p.product_name ILIKE $${count} OR p.brand ILIKE $${count})`;
            values.push(`%${filters.search}%`);
            count++;
        }

        query += ' ORDER BY p.created_at DESC';
        const result = await pool.query(query, values);
        return result.rows;
    },

    findById: async (id) => {
        const query = `
            SELECT p.*, c.category_name 
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = $1
        `;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    update: async (id, data) => {
        const fields = Object.keys(data);
        if (fields.length === 0) return null;

        const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
        const query = `UPDATE products SET ${setClause} WHERE id = $1 RETURNING *`;
        const values = [id, ...Object.values(data)];

        const result = await pool.query(query, values);
        return result.rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
};

module.exports = Product;
