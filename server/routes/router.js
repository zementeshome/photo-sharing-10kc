const express = require('express');
const router = express.Router();
const fs = require('fs');
// const Schema = mongoose.Schema;
// const multer = require('multer')

const user = require('../users.controller');

router.post('/register', user.register);
router.post('login', user.register);
router.get('/profile/id', user.register)
router.post('/uploads', user.register)
router.post('/api/photo',function(req,res){
    var newItem = new Item();
    newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
    newItem.img.contentType = 'image/png';
    newItem.save();
  });
// router.post('/login', user.register);

module.exports = router;