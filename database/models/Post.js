const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Please Enter the title']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    username: {
        type: String,
        required: [true, 'username is required']
    },
    image: {
        type: String,
        required: [true, 'Please select the image']
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;