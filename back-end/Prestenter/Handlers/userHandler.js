 const User = require('./userModel');

exports.createUser = async (userData) => {
    try {
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

exports.getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(`Error getting users: ${error.message}`);
    }
};

exports.getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error(`Error getting user: ${error.message}`);
    }
};

exports.updateUserById = async (userId, newData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};

exports.deleteUserById = async (userId) => {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        return deletedUser;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
};