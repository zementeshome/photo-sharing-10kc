const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/CrudDB', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }), (err) => {
    if(!err)
        console.log('MongoDB connection successful')
    else 
        console.log('MongoDB connection error : ' + JSON.stringify(err, undefined, 2));
};

module.exports = mongoose;