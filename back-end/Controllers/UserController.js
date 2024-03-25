const User = require('../Model/DAOs/userModel')

// @desc    Create a new user
// @route   POST /user
// @access  Private
const createUser = async (req, res) => {
    try { 
        const user = await User.create({
            user_id: req.body.user_id,
            email: req.body.email,
            name: req.body.name
        })
        
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 

// @desc    Get all users
// @route   GET /user
// @access  Private
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a user by ID
// @route   GET /user/:id
// @access  Private
const getUserById = async (req, res) => {
    try {
        const user = await await User.findById(req.params.id); 
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a user by ID
// @route   PUT /user/:id
// @access  Private
const updateUser = async (req, res) => {
    try { 
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true,})
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a user by ID
// @route   DELETE /user/:id
// @access  Private
const deleteUser = async (req, res) => {
    try { 
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};