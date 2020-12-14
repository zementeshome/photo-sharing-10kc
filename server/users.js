const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

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
    saltSecret: String
});

// const User = mongoose.model('User', userSchema)

userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'invalid email')

// figure out username validation

// userSchema.path('username').validate(function(val, res) {
//     User.findOne({name: val}, 'id', function(err, user) {
//         if (err) return res(err);
//         if (user) return res(false);
//         res(true);
//     });
//   }, "username already exists");

userSchema.pre('save', (next) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) =>{
            this.password = hash;
            this.saltSecret = salt; // not displaying 
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema)
