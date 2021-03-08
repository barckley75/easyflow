const BlogPage = require('../models/blogPageModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sharp = require('sharp');
const multer = require('multer');

exports.createBlogPage = catchAsync(async (req, res, next) => {
    const blogPage = await BlogPage.create(req.body);

    res.status(200).json({
        status: 'success',
        blogPage
    });
});

exports.updateBlogPage = catchAsync(async (req, res, next) => {
    const blogPage = await BlogPage.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        blogPage
    });
});