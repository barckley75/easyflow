const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });

});

exports.updateUser = catchAsync(async (req, res, next) => {
    const users = User.findOne({ email });

    res.status(200).json({
        status: 'success',
        message: 'All Users'
    });
});

exports.deteteUser = catchAsync(async (req, res, next) => {
    const users = User.find();

    res.status(200).json({
        status: 'success',
        message: 'All Users',
        data: {
            users
        }
    });
});