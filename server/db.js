const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CrudDB', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if(!err)
        console.log('mongodb connection successful')
    else 
    console.log('mongodb connection error: ' + JSON.stringify(err, undefined, 2));
})

require('./users');

module.exports = mongoose;