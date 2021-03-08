const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const cartSchema = new mongoose.Schema({
    name: {
        type: String
    }
});

const cart = mongoose.model('cart', cartSchema);

module.exports = cart;