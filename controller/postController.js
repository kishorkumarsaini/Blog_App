const Post = require('../database/models/Post');
const path = require('path');

//create post

exports.createNewPost = (req, res) => {
    res.render('create');
}



exports.storeNewPost = (req, res) => {

    const { image } = req.files;
    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        }, (error, post) => {
            res.redirect('/');
        })

    });
}


exports.getSinglePost = async(req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('post', {
        post
    });
}

//home page
exports.homePage = async(req, res) => {
    const posts = await Post.find({});
    res.render('index', {
        posts
    });
}