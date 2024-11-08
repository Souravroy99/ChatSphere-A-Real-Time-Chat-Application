const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String, 
        required: true,
        unique: true,
        min: 3,
        max: 20,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password:{
        type: String,
        required: true,
        max: 8,
    },
    isAvatarImageSet:{
        type: Boolean,
        default: false,
    },
    avatarImage:{
        type: String,
        default: "",
    },
})

const User = mongoose.model('users', userSchema);
module.exports = User;