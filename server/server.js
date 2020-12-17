const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routerIndex = require('./routes/router');
require('./db');
const multer = require('multer')

app.use(bodyParser.json());
app.use(cors());
app.use('/api', routerIndex);
app.use((err, req, res, next) => {
    if(err.name === 'ValidationError') {
        let valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
})
// app.use(multer({ dest: '/uploads',
// rename: function(fieldname, filename) {
//     return filename
// },
// }));


app.listen('4000', 'localhost');
console.log("listening on port 4000")