const User = require('./userModel'); // Import the User model

class UserDao {

    UserDao(){
        // Establish the connection to the database
        // mongoose.connect('mongodb://localhost:27017/DinnerDate', { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async retrieveUser(username) //retrieve user from database
    {
        try {
            const user = await User.findOne({ username });
            return user; //returns null if username doesn't exist
        } catch (error) {
            console.error("Error retrieving user:", error);
            return null;
        }
    }

    async addNewUser(user) //add user to database
    {
        if(this.retrieveUser(user.username) != null)
        {
            console.error("Username is already in use!");
            return null;
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

    async updateUser(user, category, newInfo) //update existing user
    {
        try {
            //retreive user from database
            const originalUser = this.retrieveUser(user.username);
            //set user.category to newInfo
            originalUser[category] = newInfo;
            
            //update user in database
            const updatedUser = await originalUser.save();
            return updatedUser;
        }
        catch (error) {
            console.log("Error updating user:", error);
            return null;
        }
    }
}

module.exports = UserDao;