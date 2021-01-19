const Photo = require('./photos');
const fs = require('fs');
const User = require('./users');

loadImage = async (req, res, next) => {
     //find user with matching username
    // if user is true load image 
    // mongoose won't execute query until exec or then has been called. .exec() will execute returning a promise
    // since i'm querying for data to the db i wanted to make sure the functions always returned a promise so i used async await
    let user = await User.findOne({ 'username': req.params.username}).exec();
    if(user) {
        res.json({ data: user.photo.data? user.photo.data.toString('base64') : null, contentType: user.photo.contentType, caption: user.photo.caption})
    }
}

login = async(req, res, next) =>  {
    // find user with matching username and password 
    // then return a response as username, email, photo 
    // the photo data is converted into a string with base 64, which allows you to view the image on the front end
    // this information is used to display the image 
    const {username, password} = req.body
    const user = await User.findOne({'username': username,'password': password}).exec()
     if(user.email){
         res.json({username: user.username, email: user.email, photo: {
             data: user.photo.data? user.photo.data.toString('base64'): null,
             contentType: user.photo.contentType,
             caption: user.photo.caption
         }});
     } else {
         res.status(404).send("this user doesn't exist")
     }
 }

 deleteImage = async(req, res, next) => {
      // find the user with the username that matches current user from params 
     // if user is found set the image as null
     // save the user and send response as true 
    const {username} = req.params;
    let foundUser = await User.findOne({ 'username': username}).exec();
    if(foundUser) {
        foundUser.photo = null;
        await foundUser.save();
        res.json(true)
    }
}

uploadImageToProfile = async (req, res, next) => {
     // once a file is created a file object will be availble in the request
    // find the user with the given username, which is being sent wit the request as part of the params
    // then the request is executed 
    // if we find a user, set the image property as caption as the user's input, then file will be read 
    // mimetype gives us information about the content whether it's an image/jpeg, image/png, etc
    // then the user is saved 
    // then the response is sent as true 
    // wrap await in try/ catch block 
    // test different files sizes
    // estimate file size, throw an exception 
    // multer docs memory storage
    let file = req.file
    let user = await User.findOne({ 'username': req.params.username }).exec();
        if(user) {
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
        else // wrap below in brackets or else will only execute line underneath 
        {
            if (err.code == 11000) 
            res.status(422).send(['this user is already registered'])
            else
            return next(err);
        }
    });
}

exports.login = login;
exports.register = register;
exports.loadImage = loadImage;
exports.deleteImage = deleteImage;
exports.uploadImageToProfile = uploadImageToProfile;