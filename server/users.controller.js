const Photo = require('./photos');
const fs = require('fs');
const User = require('./users');
// const User = mongoose.model('User');

// register = async(req, res) => {
//     const {username, password, email} = req.body;
//     const newUser = new User({
//         username, password, email
//     });
//     const userCreated = await newUser.save();
//     res.json(userCreated);
// }

uploadImage = async (req, res, next) => {
    console.log(req.body)
    let file = req.file
    let existingImage = await Photo.findOne({ 'name': req.file.filename }).exec();
    if(existingImage && existingImage.isNew) {
        existingImage.data = fs.readFileSync(file.path);
        existingImage.caption = file.filename;
        existingImage.contentType = file.mimetype;
        let result = await existingImage.save();
        if(result) {
            res.json(true)
        }
    } else {
        let photo = new Photo({
            data: fs.readFileSync(__dirname + '/' + file.path),
            caption: file.filename,
            contentType: file.mimetype
        });
        try {
            let result = await photo.save();
            console.log(result)
            res.json(true)
        } catch (ex) {
            console.log(ex)
        }
    }
}

loadImage = async (req, res, next) => {
    let user = await User.findOne({ 'username': req.params.username}).exec();
    if(user) {
        console.log(user);
        res.json({ data: user.photo.data.toString('base64'), contentType: user.photo.contentType, caption: user.photo.caption})
    }
}

login = async(req, res, next) =>  {
    const {username, password} = req.body
    const user = await User.findOne({'username': username,'password': password}).exec()
     if(user.email){ // should be user?.
         res.json({username: user.username, email: user.email, photo: {
             data: user.photo.data.toString('base64'),
             contentType: user.photo.contentType,
             caption: user.photo.caption
         }});
     }else{
         res.status(404).send("this user doesn't exist")
     }
 }

 deleteImage = async(req, res, next) => {
    const {username} = req.params;
    let foundUser = await User.findOne({ 'username': username}).exec();
    if(foundUser) {
        foundUser.photo = null;
        await foundUser.save();
        res.json(true)
    }
}

uploadImageToProfile = async (req, res, next) => {
    let file = req.file
    console.log(req.file);
    console.log('caption', req.body.caption)
    let user = await User.findOne({ 'username': req.params.username }).exec();
    console.log('user',user);
    if(user){
        console.log(__dirname+'/'+file.path);
        let data = fs.readFileSync( __dirname+'/'+file.path);
        console.log('file read')
        user.photo = {
            caption: req.body.caption,
            data: data,
            contentType: file.mimetype
        };

        let result = await user.save();
        console.log(result)
        res.json(true)
    }
}

register = (req, res, next) => {
    const user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    console.log(user.username, user.email, user.password)
    user.save((err, doc) => {
        console.log(err);
        if(!err){
            res.send(doc);
        }
        else
        {
            if (err.code == 11000 || user) 
            res.status(422).send(['this user is already registered'])
            else
            return next(err);
        }
    });
}


// register = async(req, res)=>{
//     const {username, password, email} = req.body;
//     const newUser = new User(
//         username, password, email
//     );
//     const userCreated = await newUser.save();
//     res.json(userCreated);
// }



exports.login = login;
exports.register = register;
exports.uploadImage = uploadImage;
exports.loadImage = loadImage;
exports.deleteImage = deleteImage;
exports.uploadImageToProfile = uploadImageToProfile;


 

