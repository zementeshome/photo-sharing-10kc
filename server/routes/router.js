const express = require('express');
const router = express.Router();

const user = require('../users.controller');

router.post('/register', user.register);

module.exports = router;