const UserDao = require('../Model/DAOs/userDAO');

const userDao = new UserDao();

// @desc    Get all users
// @route   GET /user
// @access  Private
const getUsers = async (req, res) => {
    try {
        const users = await userDao.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new user
// @route   POST /user
// @access  Private
const createUser = async (req, res) => {
    try {
        const user = await userDao.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get a user by ID
// @route   GET /user/:id
// @access  Private
const getUserById = async (req, res) => {
    try {
        const user = await userDao.getUserById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a user by ID
// @route   PUT /user/:id
// @access  Private
const updateUserById = async (req, res) => {
    try {
        const updatedUser = await userDao.updateUserById(req.params.id, req.body);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a user by ID
// @route   DELETE /user/:id
// @access  Private
const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await userDao.deleteUserById(req.params.id);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
};