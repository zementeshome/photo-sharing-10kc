const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        req: "username can't be empty",
        unique: true
    },
    email: {
        type: String,
        req: "email can't be empty",
        unique: true
    },
    password: {
        type: String,
        req: "password can't be empty",
        minlength: [6, "password must be atleast 6 characters long"]
    },
    photo: {
        caption: String,
        data: Buffer,
        contentType: String
    }
});

// email validation

userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'invalid email')

module.exports = mongoose.model('User', userSchema)
