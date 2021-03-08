const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser._id);

    res.cookie('jwt', token, {
        httpOnly: true
    });

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next();
    }
    const token = signToken(user._id);
    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() * 1000
        ),
        httpOnly: true
    });

    res.status(201).json({
        status: 'success',
        token
    });
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(201).json({
        status: 'success'
    });
};

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    };

    if (!token) {
        return next({ status: 'The Token does not exist' });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const userLogged = await User.findById(decoded.id);

    if (!userLogged) {
        return next({ status: 'The user does not exist' });
    }

    next();
});

// Only for render pages, no errors
exports.isLoggedIn = catchAsync(async (req, res, next) => {
    if (req.cookies.jwt) {
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

        const userLogged = await User.findById(decoded.id);

        if (!userLogged) {
            return next();
        }

        res.locals.user = userLogged;

        next();
    };
    next();
});