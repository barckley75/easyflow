const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
    socialName_1: {
        type: String
        // required: [true, 'Please provide a social name']
    },
    socialName_2: {
        type: String
        // required: [true, 'Please provide a social name']
    },
    socialName_3: {
        type: String
        // required: [true, 'Please provide a social name']
    },
    socialIcon_1: {
        type: String
        // required: [true, 'Please provide a social Icon']
    },
    socialIcon_2: {
        type: String
        // required: [true, 'Please provide a social Icon']
    },
    socialIcon_3: {
        type: String
        // required: [true, 'Please provide a social Icon']
    },
    socialAddress_1: {
        type: String
    },
    socialAddress_2: {
        type: String
    },
    socialAddress_3: {
        type: String
    },
    imageCover: {
        type: String
        // required: [true, 'Please provide an image cover']
    },
    publish: {
        type: Boolean,
        default: false
    }
});

const Contacts = mongoose.model('Contacts', contactsSchema);

module.exports = Contacts;