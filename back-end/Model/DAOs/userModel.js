const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // firstname: {
    //     type: String,
    //     required: true
    // },
    // lastname: {
    //     type: String,
    //     required: true
    // },
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    name: {
        type: String,
        required: true
    }
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
});

const User = mongoose.model('User', userSchema);
module.exports = User;