const pool = require('../config/db');

const User = {
    create: async (fullname, email, password, role = 'customer') => {
        const query = 'INSERT INTO users (fullname, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [fullname, email, password, role];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    },

    findById: async (id) => {
        const query = 'SELECT id, fullname, email, role, created_at FROM users WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
};

module.exports = User;
