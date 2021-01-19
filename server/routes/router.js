const express = require('express');
const router = express.Router();
const user = require('../users.controller');
const multer  = require('multer');

// multer allows you to easily read the form data when files are uploaded
const storage = multer.diskStorage({
     // images are saved in public/images folder 
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
router.post('/upload/:username', upload.single('photo', 10), uploadImageToProfile);
// upload array
// router.post('/upload/:username', upload.array('photo'. 12), uploadImageToProfile);
// uploiad.single('photo') creates an image file and saves it in public/images
// reads the content of the file from the form data

module.exports = router;