const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        unique: true,
        required: [true, 'A post must have a title']
    },
    date: {
        type: String
    },
    longText: {
        type: String,
        required: [true, 'A post must have a text']
    },
    photoBlog: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    popular: {
        type: Boolean,
        default: false
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;