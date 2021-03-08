const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    workName: {
        type: String,
        unique: true,
        maxlength: [30, '30 Max characters permitted'],
        required: [true, 'Please provide a title']
    },
    workTitle: {
        type: String,
        unique: true,
        maxlength: [50, '50 Max characters permitted'],
        required: [true, 'Please provide a subtitle']
    },
    price: {
        type: Number
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    imagePreview: {
        type: String,
        required: [true, 'Please provide a preview image for the gallery']
    },
    imagePoster: [{
        type: String,
        required: [true, 'Please provide a collection for the slide description']
    }],
    imageCover: {
        type: String,
        required: [true, 'Please provide an image for the cover page']
    }
});

const Work = mongoose.model('Work', workSchema);

module.exports = Work;