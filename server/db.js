const mongoose = require('mongoose');
const photoModel = require('./photos');

mongoose.connect('mongodb://localhost:27017/CrudDB', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }) 
.catch(err => {
    if(!err)
        console.log('MongoDB connection successful')
    else 
        console.log('MongoDB connection error : ' + JSON.stringify(err, undefined, 2));
});

require('./users');

module.exports = mongoose;