const mongoose = require('mongoose');

const blogPage = new mongoose.Schema({
    blogTitle: {
        type: String,
        minLength: [1, 'Minimum characters are 1 for the title'],
        maxLength: [25, 'Maximium characters are 25 for the title'],
        required: [true, 'The Blog must have a title page']
    },
    blogName: {
        type: String,
        minLength: [1, 'Minimum characters are 1 for your name'],
        maxLength: [20, 'Maximium characters are 20 for the title'],
        required: [true, 'The Blog must have a name']
    },
    aboutMe: {
        type: String,
        maxLength: [100, 'Maximium characters are 100 for the title'],
        minLength: [1, 'Minimum characters are 1 for your name'],
        required: [true, 'The Blog must have a name']
    }
});

const BlogPage = mongoose.model('BlogPage', blogPage);

module.exports = BlogPage;