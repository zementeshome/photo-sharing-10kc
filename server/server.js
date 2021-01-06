const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routerIndex = require('./routes/router');
require('./db');
const path = require('path')

//middleware
// need cors to communicate with back end and front end port 
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routerIndex);
//handle validation error messages globally
// function checks for validation errors 
// create an array to store error messages
// iterate through the errors push errors to array and store messages together 
app.use((err, req, res, next) => {
    if(err.name === 'ValidationError') {
        let valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
})
app.use(express.static(path.join(__dirname, 'public')));

app.listen('4000', 'localhost');
console.log("listening on port 4000")

module.exports = app;