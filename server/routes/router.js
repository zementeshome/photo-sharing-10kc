const express = require('express');
const router = express.Router();
const user = require('../users.controller');
const multer  = require('multer');

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
router.delete('/image/:username', user.deleteImage)
router.post('/upload/:username', upload.single('photo'), uploadImageToProfile)
router.post('/uploads/:username', upload.array('files'), uploadMultipleImagesToProfile)


module.exports = router;