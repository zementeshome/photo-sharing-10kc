const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    data: {
        type: Buffer,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    contentType: {
        type: String
    },
})

module.exports = mongoose.model('Photo', photoSchema);