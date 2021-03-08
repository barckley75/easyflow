const mongoose = require('mongoose');

const homepageSchema = new mongoose.Schema({
    titleOverVideo: {
        type: String,
        maxlength: [30, 'Max characters permitted are 30']
    },
    videoCover: {
        type: String,
        required: [true, 'Please provide a video']
    },
    publish: {
        type: Boolean,
        default: false
    }
});

const Homepage = mongoose.model('Homepage', homepageSchema);

module.exports = Homepage;