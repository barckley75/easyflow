const Blog = require('../models/blogModel');
const BlogPage = require('../models/blogPageModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sharp = require('sharp');
const multer = require('multer');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(console.log('This is not an image'), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadImage = upload.single('photoBlog');

exports.resizeImage = (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `photoBlog-${Date.now()}.jpeg`;
    sharp(req.file.buffer)
        .resize(1400, 372)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/blog/${req.file.filename}`);
    next();
};


exports.getBlog = catchAsync(async (req, res, next) => {
    const blogPage = await BlogPage.findById('5e7cc546cfd09d0d80209405');
    const blog = await Blog.find();

    res.status(200).json({
        status: 'success',
        data: {
            blog,
            blogPage
        }
    });
});

exports.postBlog = catchAsync(async (req, res, next) => {
    req.body.photoBlog = req.file.filename;
    const newPost = await Blog.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            blog: newPost
        }
    });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
    if (!req.body) {
        next(new AppError('No post to update in the blog.'), 404);
    }

    req.body.photoBlog = req.file.filename;
    const newPost = await Blog.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            blog: newPost
        }

    });
});

exports.popularPost = catchAsync(async (req, res, next) => {
    await Blog.updateMany({ popular: false });
    const popular = await Blog.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            popular
        }
    });
});


exports.deleteBlog = catchAsync(async (req, res, next) => {
    // console.log(req.params.id);
    await Blog.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null

    });
});