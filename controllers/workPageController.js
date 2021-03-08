const WorkPage = require('../models/workPageModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sharp = require('sharp');
const multer = require('multer');
const fs = require('fs');

const multerStorage = multer.memoryStorage();

// give an error if it's not an image
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image. Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadImageCover = upload.single('imageCover');

exports.resizeImage = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `workpage-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(1920, 1080)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/workpage/desktop/${req.file.filename}`);

    await sharp(req.file.buffer)
        .resize(375, 812)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/workpage/mobile/${req.file.filename}`);
    next();
});

exports.getWorkPages = catchAsync(async (req, res, next) => {
    if (!WorkPage) {
        next(new AppError('Bad request'), 404);
    }
    const workPage = await WorkPage.find();

    res.status(200).json({
        status: 'success',
        title: 'WorkPage',
        data: {
            workPage
        }
    });
});

exports.createWorkPage = catchAsync(async (req, res, next) => {
    req.body.imageCover = req.file.filename;
    const workPage = await WorkPage.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            workPage
        }
    });
});

exports.selectWorkPage = catchAsync(async (req, res, next) => {
    const selectWorkPage = await WorkPage.updateMany({ publish: !req.body.publish });
    const workPage = await WorkPage.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            data: workPage
        }
    });
});

exports.updateWorkPage = catchAsync(async (req, res, next) => {
    req.body.imageCover = req.file.filename;
    const workPage = await WorkPage.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            workPage
        }
    });
});

exports.deleteWorkPage = catchAsync(async (req, res, next) => {
    const image = await WorkPage.findByIdAndDelete(req.params.id);
    const url = __dirname.split('controllers')[0];
    const urlImageCoverDesktop = `${url}/public/img/workpage/desktop/${image.imageCover}`;
    const urlImageCoverMobile = `${url}/public/img/workpage/mobile/${image.imageCover}`;

    const deleteImageFromServer = (urlImage) => {
        fs.unlink(`${urlImage}`, (err) => {
            if (err) throw err;
            console.log(`successfully deleted ${urlImage}`);
        });
    };

    next(new AppError('No document found with that ID'), 404);

    deleteImageFromServer(urlImageCoverDesktop);
    deleteImageFromServer(urlImageCoverMobile);

    res.status(204).json({
        status: 'success',
        data: null
    });


});