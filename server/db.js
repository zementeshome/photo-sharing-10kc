const mongoose = require('mongoose');
const photoModel = require('./photos');
// require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/CrudDB', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }), (err) => {
    if(!err)
        console.log('MongoDB connection successful')
    else 
        console.log('MongoDB connection error : ' + JSON.stringify(err, undefined, 2));
};

require('./users');

// photoModel.find().deleteMany().then(()=>{console.log('deleted all images')})

module.exports = mongoose;