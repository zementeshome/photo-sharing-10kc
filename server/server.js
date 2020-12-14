const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db');

app.use(bodyParser.json());
app.use(cors());


app.listen('4000', 'localhost');
console.log("listening on port 4000")