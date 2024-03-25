const mongoose = require('mongoose'); 

const userModel = new mongoose.Schema({ 
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    }, 
    name: {
        type: String,
        required: true,
        unique: true
    } 
});

const User = mongoose.model('User', userModel);
module.exports = User;