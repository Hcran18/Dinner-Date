const User = require('./UserModel'); // Import the User model

class UserDao {

    UserDao(){
        // Establish the connection to the database
        // mongoose.connect('mongodb://localhost:27017/DinnerDate', { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async createUser(user) //add user to database
    {
        if(this.getUserByEmail(user.email) != null)
        {
            console.error("Email already in use!");
            throw new Error("Email already in use!");
        }
        try {
            const newUser = new User(user);
            const savedUser = await newUser.save;
            return savedUser;
        }
        catch (error) {
            console.error("Error saving new user:", error);
            return null;
        }
    }

    async getUserByEmail(email)
    {
        try{
            const user = await User.findOne(email)
            return user;
        } catch (error) {
            throw new Error(`Error getting user: ${error.message}`)
        }
    }

    async getUserById(userId) //retrieve user from database
    {
        try {
            const user = await User.findById(userId);
            return user;
        } catch (error) {
            throw new Error(`Error getting user: ${error.message}`);
        }
    }

    async getAllUsers() {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw new Error(`Error getting users: ${error.message}`);
        }
    }

    async updateUserById(userId, newData) //update existing user
    {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });
            return updatedUser;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async deleteUserById(userId) {
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            return deletedUser;
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}

module.exports = UserDao;