const User = require('./userModel');  

class UserDao { 
    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ email });
            return user;
        } catch (error) {
            console.error(`Error getting user by email: ${error.message}`);
            throw new Error(`Error getting user by email: ${error.message}`);
        }
    }  

    async createUser(user) //add user to database 
    {
        console.log("Received user data:", user);
        
        const newUser = new User({
            user_id: user.user_id,
            email: user.email,
            name: user.name
        });
 
        newUser.save()
        .then(item => {
            console.log('Item inserted successfully:', item);
        })
        .catch(err => {
            console.error('Error inserting item:', err);
        }); 
    } 

    async getUserById(userId) {
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

    async updateUser(userId, newData)  
    {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });
            return updatedUser;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async deleteUser(userId) {
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            return deletedUser;
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}

module.exports = UserDao;