const pool = require('../config/db');

const User = {
    /**
     * Create a new user
     */
    create: async (fullname, email, password, role = 'customer') => {
        const query = 'INSERT INTO users (fullname, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, fullname, email, role, created_at';
        const values = [fullname, email, password, role];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    /**
     * Find a user by email (includes password for authentication)
     */
    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    },

    /**
     * Find a user by ID
     */
    findById: async (id) => {
        const query = 'SELECT id, fullname, email, role, created_at FROM users WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    /**
     * Update user details
     */
    update: async (id, data) => {
        const fields = Object.keys(data);
        if (fields.length === 0) return null;

        const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
        const query = `UPDATE users SET ${setClause} WHERE id = $1 RETURNING id, fullname, email, role, created_at`;
        const values = [id, ...Object.values(data)];

        const result = await pool.query(query, values);
        return result.rows[0];
    },

    /**
     * Delete a user
     */
    delete: async (id) => {
        const query = 'DELETE FROM users WHERE id = $1 RETURNING id, fullname, email';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    /**
     * Get all users (Admin only)
     */
    findAll: async () => {
        const query = 'SELECT id, fullname, email, role, created_at FROM users ORDER BY created_at DESC';
        const result = await pool.query(query);
        return result.rows;
    }
};

module.exports = User;
