const User = require('../models/userModel');

/**
 * Get all users
 * @route GET /api/users
 * @access Admin
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({ success: true, users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error fetching users' });
    }
};

/**
 * Get single user by ID
 * @route GET /api/users/:id
 * @access Admin
 */
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error fetching user' });
    }
};

/**
 * Update user (e.g., change role)
 * @route PUT /api/users/:id
 * @access Admin
 */
const updateUser = async (req, res) => {
    try {
        const { fullname, email, role } = req.body;
        const userData = {};
        if (fullname) userData.fullname = fullname;
        if (email) userData.email = email;
        if (role) userData.role = role;

        const user = await User.update(req.params.id, userData);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error updating user' });
    }
};

/**
 * Delete user
 * @route DELETE /api/users/:id
 * @access Admin
 */
const deleteUser = async (req, res) => {
    try {
        const user = await User.delete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error deleting user' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
