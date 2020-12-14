const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    saltSecret: String
});

userSchema.pre('save', (next) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) =>{
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema)
