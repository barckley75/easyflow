const Homepage = require('../models/homepageModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sharp = require('sharp');
const multer = require('multer');
const fs = require('fs');

const multerStorage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/homepage');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `videoCover-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('video')) {
        cb(null, true);
    } else {
        cb(console.log('this is not a video'), false);
    }
};

const upload = multer({
    storage: multerStorage1,
    fileFilter: multerFilter
});

exports.uploadVideoCover = upload.single('videoCover');

exports.getHomepages = catchAsync(async (req, res, next) => {
    if (!Homepage) {
        next(new AppError('Bad request'), 404);
    }
    const homepage = await Homepage.find();

    res.status(200).json({
        status: 'success',
        title: 'Homepage',
        data: {
            homepage
        }
    });
});

exports.getHomepage = catchAsync(async (req, res, next) => {
    const homepage = await Homepage.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            homepage
        }
    });
});

exports.createHomepage = catchAsync(async (req, res, next) => {
    req.body.videoCover = req.file.filename;
    const homepage = await Homepage.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            data: homepage
        }
    });
});

exports.selectHomepage = catchAsync(async (req, res, next) => {
    const selectHomepage = await Homepage.updateMany({ publish: !req.body.publish });
    const homepage = await Homepage.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            data: homepage
        }
    });
});

exports.updateHomepage = catchAsync(async (req, res, next) => {
    req.body.videoCover = req.file.filename;
    const homepage = await Homepage.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            data: homepage
        }
    });
});

exports.deleteHomepage = catchAsync(async (req, res, next) => {
    const video = await Homepage.findByIdAndDelete(req.params.id);
    const url = __dirname.split('controllers')[0];
    const urlVideo = `${url}/public/img/homepage/${video.videoCover}`;

    const deleteVideoFromServer = (urlVideo) => {
        fs.unlink(`${urlVideo}`, (err) => {
            if (err) throw err;
            console.log(`successfully deleted ${urlVideo}`);
        });
    };

    next(new AppError('No document found with that ID.'), 404);

    res.status(204).json({
        status: 'success',
        data: null
    });

    deleteVideoFromServer(urlVideo);
});