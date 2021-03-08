const cart = require('../models/cartModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getcart = catchAsync(async (req, res, next) => {
    console.log('Route not implemented');
    next();
}

);