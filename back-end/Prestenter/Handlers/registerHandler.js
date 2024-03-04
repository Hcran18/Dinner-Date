const User = require('./UserModel');

class RegisterHandler {

    userDao = null;

    RegisterHandler(){
        userDao = new UserDao();
    }

    async registerUser(userData) {
        const newUser = new User(userData);
        try {
            const registeredUser = userDao.createUser(registeredUser);
            return registeredUser;
        } catch (error) {
            if(error.contains("Username already in use!"))
            {
                //send "Username already in use!" to View
            }
            else
            {
                //send "Error creating new user" to View
            }
            return null;
        }
    }
}