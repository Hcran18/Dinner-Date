const User = require('./UserModel');
import Navbar from '../../src/View/Pages/Navbar.js'

class RegisterHandler {

    userDao = null;

    navbar = null;

    RegisterHandler(navigationBar){
        userDao = new UserDao();
        navbar = navigationBar
    }

    // store their user_id, name, email
    async authenticateUser(user) {
        userData = { user_id: user.sub, name: user.name, email: user.email};
        const newUser = new User(userData);
        try {
            const retrievedUser = this.userDao.getUserById(newUser.user_id);
            if(retrievedUser === null) this.registerUser(user);
            else this.loginUser(user);
        } catch (error) {
            throw new Error("Error: ", error); 
        }

        try {
            const registeredUser = userDao.createUser(registeredUser);
            this.navbar.popToast("Registration complete! Welcome!");
            return registeredUser;
        } catch (error) {
            if(error.contains("Email already in use!"))
            {
                //send "Email already in use!" to View
            }
            else
            {
                //send "Error creating new user" to View
            }
            return null;
        }
    }

    async loginUser(user) {
        
    }

    async registerUser(user) {

    }
}