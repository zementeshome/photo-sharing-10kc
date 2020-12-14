// const mongoose = require('mongoose');
const User = require('./users');
// const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    let user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if(!err)
        res.send(doc);
    });
}
