const express = require('express');
const router = express.Router();
const user = require('../users.controller');
const fs = require('fs')
const multer  = require('multer');
const cors = require('cors');
// const multipart = require('connect-multiparty');
// const multipartMiddleware = multipart({
// uploadDir: './public/images'
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + file.mimetype.replace('image/', '.'))
    }
})

const upload = multer({ storage: storage })

router.post('/register', user.register);
router.post('/login', user.login);
router.get('/loadimage/:username', user.loadImage)
// router.post('/upload/:username', upload.single('photo'), user.uploadImageToProfile)
router.delete('/image/:username', user.deleteImage)
router.post('/upload/:username', upload.single('photo'), uploadImageToProfile)


module.exports = router;