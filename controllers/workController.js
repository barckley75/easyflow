const Work = require('../models/workModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sharp = require('sharp');
const multer = require('multer');
const fs = require('fs');

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

exports.uploadImage = upload.fields([{ name: 'video', maxCount: 1 }, { name: 'imagePreview', maxCount: 1 }, { name: 'imagePoster', maxCount: 10 }, { name: 'imageCover', maxCount: 1 }]);

exports.resizeImage = catchAsync(async (req, res, next) => {
    if (!req.files) return next();

    const { imagePreview, imagePoster, imageCover } = { ...req.files };

    if (imagePreview) {
        imagePreview[0].fieldname = `imagePreview-${Date.now()}.jpeg`;
        await sharp(imagePreview[0].buffer)
            .resize(160, 160)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/imagePreview/${imagePreview[0].fieldname}`);
    };

    if (imagePoster) {
        for (i = 0; i < imagePoster.length; i++) {
            imagePoster[i].fieldname = `imagePoster-${Date.now()}.jpeg`;
            await sharp(imagePoster[i].buffer)
                .resize(350, 350)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`public/img/imagePoster/${imagePoster[i].fieldname}`);
        }
    };

    if (imageCover) {
        imageCover[0].fieldname = `imageCover-${Date.now()}.jpeg`;

        await sharp(imageCover[0].buffer)
            .resize(1920, 1080)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/imageCover/desktop/${imageCover[0].fieldname}`);

        await sharp(imageCover[0].buffer)
            .resize(375, 812)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/imageCover/mobile/${imageCover[0].fieldname}`);

    };

    next();
});

exports.getAllWorks = catchAsync(async (req, res, next) => {
    // get data
    const works = await Work.find();
    if (!works) {
        next(new AppError(`No document found.`, 404)
        );
    }

    res.status(200).json({
        status: 'success',
        data: {
            works
        }
    });
});

exports.getWork = catchAsync(async (req, res, next) => {
    if (!Work) {
        return next(new AppError(`No document found with that ID.`, 404));
    };
    const work = await Work.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            work
        }
    });
});

exports.createWork = catchAsync(async (req, res, next) => {
    if (!req.body) {
        next(new AppError('No document Created.'), 404);
    }
    const { imagePreview, imagePoster, imageCover } = { ...req.files };
    req.body.imagePreview = imagePreview[0].fieldname;
    req.body.imagePoster = [];
    for (i = 0; i < imagePoster.length; i++) {
        req.body.imagePoster.push(imagePoster[i].fieldname);
    }
    req.body.imageCover = imageCover[0].fieldname;

    const newWork = await Work.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            work: newWork
        }
    });
});

exports.updateWork = catchAsync(async (req, res, next) => {

    const work = await Work.findByIdAndUpdate(req.params.id, req.body);
    next(new AppError('No document found with that ID.'), 404);

    res.status(200).json({
        status: 'success',
        data: {
            work
        }
    });
});

exports.deleteWork = catchAsync(async (req, res, next) => {
    const images = await Work.findByIdAndDelete(req.params.id);
    const url = __dirname.split('controllers')[0];
    const urlImagePreview = `${url}/public/img/imagePreview/${images.imagePreview}`;
    const urlImageCoverDesktop = `${url}/public/img/imageCover/desktop/${images.imageCover}`;
    const urlImageCoverMobile = `${url}/public/img/imageCover/mobile/${images.imageCover}`;
    console.log(urlImagePreview);

    const deleteImageFromServer = (urlImages) => {
        fs.unlink(`${urlImages}`, (err) => {
            if (err) throw err;
            console.log(`successfully deleted ${urlImages}`);
        });
    };

    for (i = 0; i < images.imagePoster.length; i++) {
        const urlImagePoster = `${url}/public/img/imagePoster/${images.imagePoster[i]}`;
        deleteImageFromServer(urlImagePoster);
    }

    deleteImageFromServer(urlImagePreview);
    deleteImageFromServer(urlImageCoverDesktop);
    deleteImageFromServer(urlImageCoverMobile);

    next(new AppError('No document found with that ID.'), 404);

    res.status(204).json({
        status: 'success',
        data: null
    });
});