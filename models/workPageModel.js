const mongoose = require('mongoose');

const workPage = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'You must provide a title to the gallery'],
        maxlength: [30, 'Max characters permitted are 30']
    },
    subTitle: {
        type: String,
        required: [true, 'You must provide a subtitle to the gallery'],
        maxlength: [50, 'Max characters permitted are 30']
    },
    imageCover: {
        type: String,
        required: [true, 'Please provide an image for the gallery']
    },
    publish: {
        type: Boolean,
        default: false
    }
});

const WorkPage = mongoose.model('WorkPage', workPage);

module.exports = WorkPage;