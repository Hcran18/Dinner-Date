const User = require('./UserModel');
// import Navbar from '../../src/View/Pages/Navbar.js'

class AuthenticationHandler {

    constructor(){
        this.userDao = new UserDao();
    }

    // store their user_id, name, email
    async authenticateUser(user) {
        userData = { user_id: user.sub, name: user.name, email: user.email};
        const newUser = new User(userData);
        try {
            const retrievedUser = this.userDao.getUserById(newUser.user_id);
            if(retrievedUser === null) return this.registerUser(user);
            else return this.loginUser(user);
        } catch (error) {
            throw new Error("Error: ", error); 
        }
    }

    async loginUser(user) {
        console.log("Log user in");
        retrievedUser = user; //standin for db access
        return retrievedUser;
    }

    async registerUser(user) {
        console.log("Register user");
        newUser = user; //standin for db access
        return newUser;
        // try {
        //     const registeredUser = userDao.createUser(registeredUser);
        //     return registeredUser;
        // } catch (error) {
        //     if(error.contains("Email already in use!"))
        //     {
        //         //send "Email already in use!" to View
        //     }
        //     else
        //     {
        //         //send "Error creating new user" to View
        //     }
        //     return null;
        // }
    }
}

module.exports = AuthenticationHandler;