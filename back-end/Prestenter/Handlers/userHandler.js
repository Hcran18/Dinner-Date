const User = require('./userModel');

class UserHandler {

    userDao = null;

    UserHandler() {
        userDao = new UserDao();
    }

    
}