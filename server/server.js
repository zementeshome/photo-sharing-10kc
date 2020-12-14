const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routerIndex = require('./routes/router');
require('./db');

app.use(bodyParser.json());
app.use(cors());
app.use('/api', routerIndex);


app.listen('4000', 'localhost');
console.log("listening on port 4000")